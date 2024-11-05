import { createCategory, getAllCategories } from '@/apis/categories.api';
import { createSubcategory } from '@/apis/subcategories.api';
import { ICategory } from '@/types/backend';
import { convertArrayToSelect } from '@/utils/convertArrayToSelect';
import { Modal, Form, Input, message, Select } from 'antd';
import type { FormProps } from 'antd';
import { useEffect, useState } from "react";

interface AddCategoryModalProps {
    isOpen: boolean
    setOpen: (v: boolean) => void
    getData: () => void
}

const AddSubcategoryModal = ({ isOpen, setOpen, getData }: AddCategoryModalProps) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[] | []>([]);

    const fetchCategories = async () => {
        const res = await getAllCategories();
        if (res.data) {
            setCategories(res.data);
        }
        else if (res.error) {
            message.error(res.message);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleCloseModal = () => {
        form.resetFields();
        setOpen(false);
    }

    const onFinish: FormProps['onFinish'] = async (values: { name: string, categoryId: string }) => {
        setIsLoading(true);
        const res = await createSubcategory(values);
        if (res.data) {
            setIsLoading(false);
            message.success("Add subcategory succeed")
            handleCloseModal();
            getData();
        }
        else if (res?.error) {
            message.error(res.message)
            setIsLoading(false);
        }
    }

    return (
        <Modal title="Add subcategory"
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
                    rules={[{ required: true, message: 'Please input subcategory name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[{ required: true, message: 'Please select category!' }]}
                >
                    <Select
                        options={convertArrayToSelect(categories)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddSubcategoryModal