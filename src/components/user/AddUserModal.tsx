import { useState } from "react";
import { Modal, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import { createUser } from "@/apis/users.api";

interface AddUserModalProps {
    isOpen: boolean
    setOpen: (v: boolean) => void
    getData: () => void
}

const AddUserModal = ({ isOpen, setOpen, getData }: AddUserModalProps) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCloseModal = () => {
        form.resetFields();
        setOpen(false);
    }

    const onFinish: FormProps['onFinish'] = async (values: { name: string, email: string, password: string }) => {
        setIsLoading(true);
        const res = await createUser(values);
        if (res.data) {
            setIsLoading(false);
            message.success("Add user succeed")
            handleCloseModal();
            getData();
        }
        else if (res?.error) {
            message.error(res.message)
            setIsLoading(false);
        }
    }

    return (
        <Modal title="Add user"
            open={isOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseModal()}
            maskClosable={false}
            okButtonProps={{
                loading: isLoading
            }}
        >
            <Form
                name="Add user"
                onFinish={onFinish}
                form={form}
                layout='vertical'
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input user name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input user email!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input password!', whitespace: true }]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddUserModal