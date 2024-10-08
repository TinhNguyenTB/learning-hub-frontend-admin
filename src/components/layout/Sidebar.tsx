import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import {
    DesktopOutlined,
    UnorderedListOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Users', '/users', <UserOutlined />),
    getItem('Team', 'sub2', <TeamOutlined />, [
        getItem('Team 1', '6'),
        getItem('Team 2', '8')
    ]),
    getItem('Categories', '/categories', <UnorderedListOutlined />),
];

const Sidebar = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    return (
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu
                onClick={(e) => navigate(e.key)}
                theme="light"
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}
            />
        </Sider>
    )
}

export default Sidebar