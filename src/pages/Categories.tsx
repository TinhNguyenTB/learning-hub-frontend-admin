import { Button, message, Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { getAllCategories } from '@/apis/categories.api';
import { ICategory } from '@/types/backend';
import AddCategoryModal from '@/components/category/AddCategoryModal';
import EditCategoryModal from '@/components/category/EditCategoryModal';

const Categories = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<ICategory[] | undefined>(undefined);
    const [dataUpdate, setDataUpdate] = useState<ICategory>({ id: "", name: "" });

    const fetchData = async () => {
        const res = await getAllCategories();
        if (res.data) {
            setCategories(res.data)
            setIsLoading(false)
        }
        else if (res?.error) {
            message.error(res.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const columns: TableProps<ICategory>['columns'] = [
        {
            title: 'NO',
            key: 'no',
            width: '1rem',
            render: (text, object, index) => <p style={{ textAlign: 'center' }}>{index + 1}</p>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <p>{record.name}</p>,
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
                                name: record.name
                            })
                            setIsEditModalOpen(true)
                        }}
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

    return (
        <div>
            <Button
                type='primary'
                style={{ margin: '0 0 1rem' }}
                onClick={() => setIsAddModalOpen(true)}
            >
                Add category
            </Button>
            <Table<ICategory>
                loading={isLoading}
                rowKey={"id"}
                bordered
                dataSource={categories}
                columns={columns}
            />
            <AddCategoryModal
                isOpen={isAddModalOpen}
                setOpen={setIsAddModalOpen}
                getData={fetchData}
            />

            <EditCategoryModal
                isOpen={isEditModalOpen}
                setOpen={setIsEditModalOpen}
                dataUpdate={dataUpdate}
                getData={fetchData}
            />
        </div>
    )
}

export default Categories