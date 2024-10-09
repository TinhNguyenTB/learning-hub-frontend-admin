import { createLevel } from "@/apis/levels.api"
import { Modal, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import { useState } from "react";

interface AddLevelModalProps {
    isOpen: boolean
    setOpen: (v: boolean) => void
    getData: () => void
}

const AddLevelModal = ({ isOpen, setOpen, getData }: AddLevelModalProps) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCloseModal = () => {
        form.resetFields();
        setOpen(false);
    }

    const onFinish: FormProps['onFinish'] = async (values: { name: string }) => {
        setIsLoading(true);
        const res = await createLevel(values);
        if (res.data) {
            setIsLoading(false);
            message.success("Add level succeed")
            handleCloseModal();
            getData();
        }
        else if (res?.error) {
            message.error(res.message)
            setIsLoading(false);
        }
    }

    return (
        <Modal title="Add level"
            open={isOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseModal()}
            maskClosable={false}
            okButtonProps={{
                loading: isLoading
            }}
        >
            <Form
                name="Add level"
                onFinish={onFinish}
                form={form}
                layout='vertical'
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input level name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddLevelModal