import { login } from '@/apis/auth';
import { PATH, ROLE } from '@/utils/constants';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Typography } from 'antd';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();

    const onFinish = async (values: { email: string, password: string }) => {
        const res = await login(values);
        if (res.data) {
            if (res.data.user.role !== ROLE.ADMIN) {
                return;
            }
            Cookies.set('access_token', res.data.access_token, { expires: 7, secure: true, sameSite: "Lax" })
            Cookies.set('id', res.data.user.id, { expires: 7, secure: true, sameSite: "Lax" })
            navigate(PATH.HOME)
        }
        else if (res.error) {
            message.error(res.message);
            console.log("Login error:", { res })
        }
    };

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