import { AuthContext } from '@/contexts/AuthProvider';
import { Avatar, Layout, theme, Tooltip } from 'antd';
import { useContext } from 'react';
import { LogoutOutlined } from '@ant-design/icons'

const { Header } = Layout;

const Topbar = () => {
    const { token: { colorBgContainer } } = theme.useToken();
    //@ts-ignore
    const { user, handleLogout } = useContext(AuthContext);

    return (
        <Header style={{
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            justifyContent: 'space-between',
            background: colorBgContainer
        }} >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
            }}>
                <Avatar
                    size={{ sm: 15, md: 30, lg: 40, xl: 50 }}
                    style={{ backgroundColor: "#f56a00", fontWeight: 'bold' }}>
                    {user?.name.slice(0, 1).toUpperCase()}
                </Avatar>
                <h1>{user?.name}</h1>
            </div>
            <Tooltip title="Log out">
                <LogoutOutlined style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                    onClick={() => handleLogout()}
                />
            </Tooltip>
        </Header>
    )
}

export default Topbar