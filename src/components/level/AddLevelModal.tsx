// import { useMutation } from "@tanstack/react-query"
// import { createLevel } from "@/apis/levels.api"
// import { Modal, Form, Input, notification } from 'antd';
// import type { FormProps } from 'antd';

// interface AddLevelModalProps {
//     isOpen: boolean
//     setOpen: (v: boolean) => void
//     getData?: any
// }

// const AddLevelModal = ({ isOpen, setOpen }: AddLevelModalProps) => {
//     const [form] = Form.useForm();
//     const mutation = useMutation({
//         mutationFn: (body: { name: string }) => {
//             return createLevel(body)
//         },
//     })

//     const handleCloseModal = () => {
//         form.resetFields();
//         setOpen(false);
//     }

//     const onFinish: FormProps['onFinish'] = (values: any) => {
//         mutation.mutate(values);
//         if (mutation.isSuccess) {
//             handleCloseModal();
//         }
//     }

//     return (
//         <Modal title="Add level"
//             open={isOpen}
//             onOk={() => form.submit()}
//             onCancel={() => handleCloseModal()}
//             maskClosable={false}
//         >
//             <Form
//                 name="Add level"
//                 onFinish={onFinish}
//                 form={form}
//                 layout='vertical'
//             >
//                 <Form.Item
//                     label="Name"
//                     name="name"
//                     rules={[{ required: true, message: 'Please input level name!', whitespace: true }]}
//                 >
//                     <Input />
//                 </Form.Item>
//             </Form>
//         </Modal>
//     )
// }

// export default AddLevelModal