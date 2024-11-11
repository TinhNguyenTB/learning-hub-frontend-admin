import { Button, message, Select, Table } from 'antd';
import { TableProps, GetProps, Input } from 'antd';
import { useEffect, useState } from 'react';
import { IUser } from '@/contexts/AuthProvider';
import { changeActivateAccount, changeUserRole, deleteUserById, getAllUsers } from '@/apis/users.api';
import { ROLE } from '@/utils/constants';
import AddUserModal from '@/components/user/AddUserModal';


type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const roles = [
    { value: ROLE.USER, label: ROLE.USER },
    { value: ROLE.ADMIN, label: ROLE.ADMIN },
]

const isDeleted = [
    { value: true, label: "TRUE" },
    { value: false, label: "FALSE" },
]

const Users = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<IUser[] | undefined>(undefined);

    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [search, setSearch] = useState<string>("");

    const fetchData = async (current: number, pageSize: number, search?: string) => {
        setIsLoading(true)
        const res = await getAllUsers(current, pageSize, search);
        if (res.data) {
            setUsers(res.data.result);
            setTotalPages(res.data.meta.total);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setIsLoading(false)
        }
        else if (res?.error) {
            message.error(res.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData(current, pageSize, search)
    }, [])

    const handleChangeDeleted = async (value: boolean, id: string) => {
        const res = await deleteUserById(value, id);
        if (res.data) {
            message.success("Change deleted user succeed");
            fetchData(current, pageSize, search)
        }
        else if (res.error) {
            message.error(res.message)
        }
    }

    const handleChangeRole = async (value: string, id: string) => {
        const res = await changeUserRole(value, id);
        if (res.data) {
            message.success("Change user role succeed");
            fetchData(current, pageSize, search)
        }
        else if (res.error) {
            message.error(res.message)
        }
    }

    const handleChangeActive = async (value: boolean, id: string) => {
        const res = await changeActivateAccount(value, id);
        if (res.data) {
            message.success("Change activation account succeed");
            fetchData(current, pageSize, search)
        }
        else if (res.error) {
            message.error(res.message)
        }
    }

    const onSearch: SearchProps['onSearch'] = (value) => {
        setSearch(value);
        fetchData(1, pageSize, value)
    }

    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'NO',
            key: 'no',
            width: '1rem',
            render: (_, record, index) => <p style={{ textAlign: 'center' }}>{index + 1}</p>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <p>{record.name}</p>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (_, record) => <p>{record.email}</p>,
        },
        {
            title: 'Role',
            key: 'role',
            render: (_, record) => (
                <Select
                    defaultValue={record.role}
                    onChange={(value) => handleChangeRole(value, record.id)}
                    options={roles}
                />
            )
        },
        {
            title: 'IsActive',
            key: 'isActive',
            render: (_, record) => (
                <Select
                    defaultValue={record.isActive}
                    onChange={(value) => handleChangeActive(value, record.id)}
                    options={isDeleted}
                />
            )
        },
        {
            title: 'Deleted',
            key: 'deleted',
            render: (_, record) => (
                <Select
                    defaultValue={record.deleted}
                    onChange={(value) => handleChangeDeleted(value, record.id)}
                    options={isDeleted}
                />
            )
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: 'column', gap: "1rem" }}>
            <Search
                size='large'
                placeholder="Search user by name"
                onSearch={onSearch}
                enterButton
                style={{ width: "50%" }}
            />
            <Button
                type='primary'
                style={{ margin: '0.5rem 0', width: 'fit-content' }}
                onClick={() => setIsAddModalOpen(true)}
            >
                Add user
            </Button>
            <Table<IUser>
                loading={isLoading}
                rowKey={"id"}
                bordered
                dataSource={users}
                columns={columns}
                pagination={{
                    defaultCurrent: 1,
                    total: totalPages,
                    current: current,
                    pageSize: pageSize,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
                    onChange(page, pageSize) {
                        fetchData(page, pageSize, search)
                    },
                }}
            />
            <AddUserModal
                isOpen={isAddModalOpen}
                setOpen={setIsAddModalOpen}
                getData={() => fetchData(current, pageSize)}
            />

        </div>
    )
}

export default Users