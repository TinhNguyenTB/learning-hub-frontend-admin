import { message, Popconfirm, Table, Input, Select } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { ICourse, IStatus } from '@/types/backend';
import { changeStatus, deleteCourseById, getAllCourses } from '@/apis/courses.api';
import type { GetProps } from 'antd';
import { formatCurrency } from '@/utils/formatCurrency';
import { getAllStatus } from '@/apis/status.api';
import { convertArrayToSelectStatus } from '@/utils/convertArrayToSelect';


type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const Courses = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [courses, setCourses] = useState<ICourse[] | undefined>(undefined);
    const [status, setStatus] = useState<IStatus[]>([]);

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

    const fetchStatus = async () => {
        const res = await getAllStatus();
        if (res.data) {
            setStatus(res.data)
        }
        else if (res?.error) {
            message.error(res.message)
        }
    }

    useEffect(() => {
        fetchData(current, pageSize, search)
        fetchStatus()
    }, [])



    const columns: TableProps<ICourse>['columns'] = [
        {
            title: 'NO',
            key: 'no',
            width: '1rem',
            render: (_, record, index) => (
                <p style={{ textAlign: 'center' }}>
                    {(current - 1) * pageSize + index + 1}
                </p>
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
            title: 'Instructor',
            dataIndex: ['instructor', 'name'],
            key: 'instructor',
        },
        {
            title: 'Status',
            key: 'statusName',
            render: (_, record) => (
                <Select
                    style={{ width: '50%' }}
                    defaultValue={record.statusName}
                    onChange={(value) => handleChangeStatus(value, record.id)}
                    options={convertArrayToSelectStatus(status)}
                />
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '1.5rem',
            render: (_, record) => (
                <Popconfirm
                    placement="leftTop"
                    title={"Delete level"}
                    description={"Are you sure to delete this course?"}
                    onConfirm={() => handleDeleteCourse(record.id)}
                >
                    <DeleteOutlined
                        style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'red' }}
                    />
                </Popconfirm>
            ),
        },
    ];

    const onSearch: SearchProps['onSearch'] = (value) => {
        setSearch(value);
        fetchData(1, pageSize, value)
    }

    const handleChangeStatus = async (statusName: string, id: string) => {
        const res = await changeStatus(statusName, id);
        if (res.data) {
            message.success("Change course status succeed")
            fetchData(current, pageSize, search);
        }
        else if (res.error) {
            message.error(res.message)
        }
    };

    const handleDeleteCourse = async (id: string) => {
        const res = await deleteCourseById(id);
        if (res.data) {
            message.success("Delete course succeed")
            fetchData(current, pageSize, search);
        }
        else if (res.error) {
            message.error(res.message)
        }
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
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} courses`,
                    onChange(page, pageSize) {
                        fetchData(page, pageSize, search)
                    },
                }}
            />
        </div>
    )
}

export default Courses