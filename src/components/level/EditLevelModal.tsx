// import { useQuery } from '@tanstack/react-query';
// import { Modal, Form, Input, notification } from 'antd';
// import type { FormProps } from 'antd';
// import { useEffect } from 'react';

// interface EditLevelModalProps{
//     isOpen: boolean
//     setOpen: (v: boolean) => void
//     dataEdit:any
//     setDataEdit: any
//     getData:any
// }

// const EditLevelModal = ({ isOpen, setOpen,dataEdit,setDataEdit,getData }: EditLevelModalProps) => {
//     const [form] = Form.useForm();

//     const handleCloseModal = () => {
//         form.resetFields();
//         setOpen(false);
//         setDataEdit(null);
//     }

//     const onFinish: FormProps['onFinish'] = async (values: any) => {
//         const {name } = values;
//         if (dataEdit) {
//             const dataLevel = { id: dataEdit?.id,  name };
//            const {data} = useQuery()
//             if (data.data) {
//                 await getData();
//                 notification.success({
//                     message: 'Update user thanh cong'
//                 })
//                 handleCloseModal();
//             }
//             else {
//                 notification.error({
//                     message: 'Co loi xay ra',
//                     description: JSON.stringify(data.message)
//                 })
//             }
//         }
//     }

//     return (
//         <Modal title="Update a level"
//             open={isOpen}
//             onOk={() => form.submit()}
//             onCancel={() => handleCloseModal()}
//             maskClosable={false}
//         >
//             <Form
//                 name="basic"
//                 labelCol={{ span: 4 }}
//                 wrapperCol={{ span: 20 }}
//                 onFinish={onFinish}
//                 form={form}
//             // layout='vertical'
//             >
//                 <Form.Item
//                     label="Name"
//                     name="name"
//                     rules={[{ required: true, message: 'Please input your name!' }]}
//                 >
//                     <Input />
//                 </Form.Item>
//             </Form>
//         </Modal>
//     )
// }

// export default EditLevelModal