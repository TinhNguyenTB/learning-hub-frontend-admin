import { Button, message, Popconfirm, Space, Table, Input } from 'antd';
import type { TableProps } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { ISubcategory } from '@/types/backend';
import { deleteSubcategoryById, getAllSubcategories } from '@/apis/subcategories.api';
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const Subcategories = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [subcategories, setSubcategories] = useState<ISubcategory[] | undefined>(undefined);
    const [dataUpdate, setDataUpdate] = useState<Omit<ISubcategory, "category"> | null>(null);

    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [search, setSearch] = useState<string>("");

    const fetchData = async (current: number, pageSize: number, search: string) => {
        setIsLoading(true)
        const res = await getAllSubcategories(current, pageSize, search);
        if (res.data) {
            setSubcategories(res.data.result)
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

    const handleDeleteSubcategory = async (id: string) => {
        const res = await deleteSubcategoryById(id);
        if (res.data) {
            message.success("Delete subcategory succeed");
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

    const columns: TableProps<ISubcategory>['columns'] = [
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <p>{record.name}</p>,
        },
        {
            title: 'Category',
            key: 'category',
            dataIndex: ['category', 'name']
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="large">
                    <EditOutlined
                        style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'brown' }}
                        onClick={() => {
                            setDataUpdate({
                                id: record.id,
                                name: record.name,
                                categoryId: record.categoryId
                            })
                            setIsEditModalOpen(true)
                        }}
                    />
                    <Popconfirm
                        placement="leftTop"
                        title={"Delete level"}
                        description={"Are you sure to delete this category?"}
                        onConfirm={() => handleDeleteSubcategory(record.id)}
                    >
                        <DeleteOutlined
                            style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'red' }}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: 'column', gap: "1rem" }}>
            <Search
                size='large'
                placeholder="Search subcategory by name"
                onSearch={onSearch}
                enterButton
                style={{ width: "50%" }}
            />
            <Button
                type='primary'
                style={{ margin: '0.5rem 0', width: 'fit-content' }}
                onClick={() => setIsAddModalOpen(true)}
            >
                Add subcategory
            </Button>
            <Table<ISubcategory>
                loading={isLoading}
                rowKey={"id"}
                bordered
                dataSource={subcategories}
                columns={columns}
                pagination={{
                    defaultCurrent: 1,
                    total: totalPages,
                    current: current,
                    pageSize: pageSize,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} subcategories`,
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

        <EditCategoryModal
            isOpen={isEditModalOpen}
            setOpen={setIsEditModalOpen}
            dataUpdate={dataUpdate}
            getData={fetchData}
        /> */}
        </div>
    )
}

export default Subcategories