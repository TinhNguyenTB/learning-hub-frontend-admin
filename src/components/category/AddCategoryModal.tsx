import { createCategory } from '@/apis/categories.api';
import { Modal, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import { useState } from "react";

interface AddCategoryModalProps {
    isOpen: boolean
    setOpen: (v: boolean) => void
    getData: () => void
}

const AddCategoryModal = ({ isOpen, setOpen, getData }: AddCategoryModalProps) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCloseModal = () => {
        form.resetFields();
        setOpen(false);
    }

    const onFinish: FormProps['onFinish'] = async (values: { name: string }) => {
        setIsLoading(true);
        const res = await createCategory(values);
        if (res.data) {
            setIsLoading(false);
            message.success("Add category succeed")
            handleCloseModal();
            getData();
        }
        else if (res?.error) {
            message.error(res.message)
            setIsLoading(false);
        }
    }

    return (
        <Modal title="Add category"
            open={isOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseModal()}
            maskClosable={false}
            okButtonProps={{
                loading: isLoading
            }}
        >
            <Form
                name="Add category"
                onFinish={onFinish}
                form={form}
                layout='vertical'
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input category name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddCategoryModal