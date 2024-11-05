import React from 'react';
import { Layout, theme } from 'antd';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthProvider';

const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AuthProvider>
      <Layout style={{ minHeight: '100vh' }}>
        {/* sidebar */}
        <Sidebar />
        <Layout>
          {/* header */}
          <Topbar />
          {/* content */}
          <Content style={{ margin: '1rem' }}>
            <div
              style={{
                padding: "1.5rem",
                minHeight: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </AuthProvider>
  );
};

export default App;