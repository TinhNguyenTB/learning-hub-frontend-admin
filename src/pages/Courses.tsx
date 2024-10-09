import { message, Popconfirm, Space, Table, Input } from 'antd';
import type { TableProps } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { ICourse } from '@/types/backend';
import { getAllCourses } from '@/apis/courses.api';
import type { GetProps } from 'antd';
import { formatCurrency } from '@/utils/formatCurrency';

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const Courses = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [courses, setCourses] = useState<ICourse[] | undefined>(undefined);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [search, setSearch] = useState<string>("");

    const fetchData = async (current: number, pageSize: number, search: string) => {
        setIsLoading(true);
        const res = await getAllCourses(current, pageSize, search);
        if (res.data) {
            setCourses(res.data.result)
            setTotalPages(res.data.meta.total);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setIsLoading(false)
        }
        else if (res?.error) {
            message.error(res.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData(current, pageSize, search)
    }, [])

    const columns: TableProps<ICourse>['columns'] = [
        {
            title: 'NO',
            key: 'no',
            width: '1rem',
            render: (_, record, index) => (
                <p style={{ textAlign: 'center' }}>{(current - 1) * pageSize + index + 1}</p>
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => <p>{record.title}</p>,
        },
        {
            title: 'Price ($)',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => <p>{formatCurrency(record.price)}</p>,
        },
        {
            title: 'Category',
            dataIndex: ['category', 'name'],
            key: 'category',
        },
        {
            title: 'Status',
            dataIndex: 'statusName',
            key: 'statusName',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="large">
                    <EditOutlined
                        style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'brown' }}
                    // onClick={() => {
                    //     setDataUpdate({
                    //         id: record.id,
                    //         name: record.name
                    //     })
                    //     setIsEditModalOpen(true)
                    // }}
                    />
                    <Popconfirm
                        placement="leftTop"
                        title={"Delete level"}
                        description={"Are you sure to delete this level?"}
                    // onConfirm={() => handleDeleteLevel(record.id)}
                    >
                        <DeleteOutlined
                            style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'red' }}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const onSearch: SearchProps['onSearch'] = (value) => {
        setSearch(value);
        fetchData(1, pageSize, value)
    }

    return (
        <div style={{ display: "flex", flexDirection: 'column', gap: "1rem" }}>
            <Search
                size='large'
                placeholder="Search course by title, category"
                onSearch={onSearch}
                enterButton
                style={{ width: "50%" }}
            />
            <Table<ICourse>
                loading={isLoading}
                rowKey={"id"}
                bordered
                dataSource={courses}
                columns={columns}
                pagination={{
                    defaultCurrent: 1,
                    total: totalPages,
                    current: current,
                    pageSize: pageSize,
                    onChange(page, pageSize) {
                        fetchData(page, pageSize, search)
                    },
                }}
            />
            {/* <AddLevelModal
            isOpen={isAddModalOpen}
            setOpen={setIsAddModalOpen}
            getData={fetchData}
        />
        <EditLevelModal
            isOpen={isEditModalOpen}
            setOpen={setIsEditModalOpen}
            dataUpdate={dataUpdate}
            getData={fetchData}
        /> */}
        </div>
    )
}

export default Courses