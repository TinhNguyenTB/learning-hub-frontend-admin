import React from 'react';
import { Layout, theme } from 'antd';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
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
              padding: 24,
              minHeight: 590,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;