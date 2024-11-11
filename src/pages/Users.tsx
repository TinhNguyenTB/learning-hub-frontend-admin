import { Button, message, Popconfirm, Select, Table } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { IUser } from '@/contexts/AuthProvider';
import { getAllUsers } from '@/apis/users.api';
import { ROLE } from '@/utils/constants';


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

    // const handleDeleteCategory = async (id: string) => {
    //     const res = await deleteCategoryById(id);
    //     if (res.data) {
    //         message.success("Delete category succeed");
    //         fetchData()
    //     }
    //     else if (res.error) {
    //         message.error(res.message)
    //     }
    // }

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
                    // onChange={(value) => handleChangeRole(value,record.id)}
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
                    // onChange={(value) => handleChangeActive(value, record.id)}
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
                    // onChange={(value) => handleChangeDeleted(value,record.id)}
                    options={isDeleted}
                />
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm
                    placement="leftTop"
                    title={"Delete user"}
                    description={"Are you sure to delete this user?"}
                // onConfirm={() => handleDeleteCategory(record.id)}
                >
                    <DeleteOutlined
                        style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'red' }}
                    />
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <Button
                type='primary'
                style={{ margin: '0 0 1rem' }}
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
            {/* <AddCategoryModal
                isOpen={isAddModalOpen}
                setOpen={setIsAddModalOpen}
                getData={fetchData}
            />
             */}
        </div>
    )
}

export default Users