import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';

const LoginForm = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    console.log(import.meta.env.VITE_BASE_BACKEND_URL)
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Form
                size='large'
                name="login"
                initialValues={{ remember: false }}
                style={{
                    minWidth: 360,
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                }}
                onFinish={onFinish}
            >
                <Typography.Title level={3} style={{ textAlign: 'center' }}>Login System</Typography.Title>
                <Form.Item
                    name="email"
                    rules={[{
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
}

export default LoginForm