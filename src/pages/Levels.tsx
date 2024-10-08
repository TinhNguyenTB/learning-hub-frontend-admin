import { getAllLevels } from '@/apis/levels/getAll';
import { useQuery } from '@tanstack/react-query';
import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}

                />
                <DeleteOutlined
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}

                />
            </Space>
        ),
    },
];



const Levels = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['levels'],
        queryFn: () => getAllLevels()
    })

    const levels: DataType[] = data?.data;
    return (
        <div>
            <Table<DataType>
                loading={isLoading}
                rowKey={"id"}
                bordered
                dataSource={levels}
                columns={columns}
            />
        </div>
    )
}

export default Levels