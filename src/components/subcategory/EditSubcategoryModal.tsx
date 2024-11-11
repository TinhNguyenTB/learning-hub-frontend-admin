import { getAllCategories } from '@/apis/categories.api';
import { updateSubcategory } from '@/apis/subcategories.api';
import { ICategory } from '@/types/backend';
import { convertArrayToSelect } from '@/utils/convertArrayToSelect';
import { Modal, Form, Input, message, Select } from 'antd';
import type { FormProps } from 'antd';
import { useEffect, useState } from "react";

interface EditCategoryModalProps {
    isOpen: boolean
    setOpen: (v: boolean) => void
    getData: () => void
    dataUpdate: {
        id: string
        name: string
        categoryId: string
    }
}

const EditSubcategoryModal = ({ isOpen, setOpen, getData, dataUpdate }: EditCategoryModalProps) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[] | []>([]);

    const handleCloseModal = () => {
        form.resetFields();
        setOpen(false);
    }

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
        form.setFieldsValue({
            name: dataUpdate.name,
            categoryId: dataUpdate.categoryId
        })
    }, [dataUpdate])

    const onFinish: FormProps['onFinish'] = async (values: { name: string; categoryId: string }) => {
        setIsLoading(true);
        const res = await updateSubcategory(dataUpdate.id, values.name, values.categoryId);
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
                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[{ required: true, message: 'Please select category!' }]}
                >
                    <Select
                        defaultValue={dataUpdate.categoryId}
                        options={convertArrayToSelect(categories)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditSubcategoryModal