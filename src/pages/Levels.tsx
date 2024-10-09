import { Button, message, Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
// import AddLevelModal from '@/components/level/AddLevelModal';
import { deleteLevelById, getAllLevels } from '@/apis/levels.api';
import AddLevelModal from '@/components/level/AddLevelModal';
import EditLevelModal from '@/components/level/EditLevelModal';

interface DataType {
    id: string;
    name: string;
}

const Levels = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<DataType[] | undefined>(undefined);
    const [dataUpdate, setDataUpdate] = useState<DataType>({ id: "", name: "" });

    const fetchData = async () => {
        const res = await getAllLevels();
        if (res.data) {
            setData(res.data)
            setIsLoading(false)
        }
        else if (res?.error) {
            message.error(res.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const levels: DataType[] | undefined = data;

    const handleDeleteLevel = async (id: string) => {
        const res = await deleteLevelById(id);
        if (res.data) {
            message.success("Delete level succeed");
            fetchData()
        }
        else if (res.error) {
            message.error(res.message)
        }
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'NO',
            key: 'no',
            width: '20px',
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
                        }
                        }
                    />
                    <Popconfirm
                        placement="leftTop"
                        title={"Delete level"}
                        description={"Are you sure to delete this level?"}
                        onConfirm={() => handleDeleteLevel(record.id)}
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
                Add level
            </Button>
            <Table<DataType>
                loading={isLoading}
                rowKey={"id"}
                bordered
                dataSource={levels}
                columns={columns}
            />
            <AddLevelModal
                isOpen={isAddModalOpen}
                setOpen={setIsAddModalOpen}
                getData={fetchData}
            />
            <EditLevelModal
                isOpen={isEditModalOpen}
                setOpen={setIsEditModalOpen}
                dataUpdate={dataUpdate}
                getData={fetchData}
            />
        </div>
    )
}

export default Levels