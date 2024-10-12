import { updateCategory } from '@/apis/categories.api';
import { Modal, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import { useEffect, useState } from "react";

interface EditCategoryModalProps {
    isOpen: boolean
    setOpen: (v: boolean) => void
    getData: () => void
    dataUpdate: {
        id: string
        name: string
    }
}

const EditCategoryModal = ({ isOpen, setOpen, getData, dataUpdate }: EditCategoryModalProps) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCloseModal = () => {
        form.resetFields();
        setOpen(false);
    }

    useEffect(() => {
        form.setFieldsValue({
            name: dataUpdate.name
        })
    }, [dataUpdate])

    const onFinish: FormProps['onFinish'] = async (values: { name: string }) => {
        setIsLoading(true);
        const res = await updateCategory(dataUpdate.id, values.name);
        if (res.data) {
            setIsLoading(false);
            message.success("Update category succeed")
            handleCloseModal();
            getData();
        }
        else if (res?.error) {
            message.error(res.message)
            setIsLoading(false);
        }
    }

    return (
        <Modal title="Update category"
            open={isOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseModal()}
            maskClosable={false}
            okButtonProps={{
                loading: isLoading
            }}
        >
            <Form
                name="Update category"
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

export default EditCategoryModal