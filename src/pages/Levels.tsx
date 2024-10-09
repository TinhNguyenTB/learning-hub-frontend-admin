import { Button, message, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
// import AddLevelModal from '@/components/level/AddLevelModal';
import { getAllLevels } from '@/apis/levels.api';
import AddLevelModal from '@/components/level/AddLevelModal';

interface DataType {
    id: string;
    name: string;
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

                />
                <DeleteOutlined
                    style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'red' }}

                />
            </Space>
        ),
    },
];



const Levels = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<DataType[] | undefined>(undefined);

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
        </div>
    )
}

export default Levels