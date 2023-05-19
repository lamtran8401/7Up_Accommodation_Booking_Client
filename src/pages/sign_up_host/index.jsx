import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    Typography,
    Upload,
    message,
    DatePicker,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import AddressModal from '../../components/modal-address';
import { storage } from '../../config/firebase';
import { errorMessageCounDown, successMessageCounDown } from '../../config/utils';
import './SignUpHost.scss';
import useAuth from '@/hooks/useAuth';
const SignUpHost = () => {
    //Init
    const maxFile = 8;
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [visibleModal, setVisibleModal] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [progresspercent, setProgresspercent] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);
    const [addressObj, setAddressObj] = useState({});
    const [modalMessage, contextHolderMessage] = Modal.useModal();
    const promises = [];
    const [currentUser, setCurrentUser, logout, hasPermission] = useAuth();

    const showModal = () => {
        setVisibleModal(true);
    };
    const hanldeCanleModal = () => {
        setVisibleModal(false);
    };
    const hanldeSubmitAddress = (values) => {
        values.city = values.city.split('-')[1];
        values.district = values.district.split('-')[1];
        const addressStr = `${values.house_number}, ${values.street}, ${values.ward}, ${values.district}, ${values.city}`;
        form.setFieldsValue({
            address: addressStr,
        });
        setAddressObj({
            houseNumber: values.house_number,
            street: values.street,
            ward: values.ward,
            district: values.district,
            city: values.city,
        });
        setVisibleModal(false);
    };
    const hanldeSubmitForm = (values) => {
        values.location = addressObj;
        let loading = document.getElementById('loading');
        loading.classList.remove('hide-loader');
        loading.classList.add('show-loader');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        axios
            .post(`${import.meta.env.VITE_API_BASE_URL}/accounts/registerHost/${currentUser.id}`, values)
            .then((response) => {
                form.resetFields();
                setCurrentUser(response.data);
                //setFileList([]);
                loading.classList.remove('show-loader');
                loading.classList.add('hide-loader');
                successMessageCounDown(5, 'Đăng ký thành công', modalMessage);
            })
            .catch((response) => {
                //handle error
                loading.classList.remove('show-loader');
                loading.classList.add('hide-loader');
                errorMessageCounDown(5, 'Đăng ký thất bại thất bại', modalMessage);
                console.log(response);
            });
    };
    return (
        <div className="sign-up-host">
            <Typography.Title level={2} className="form__title">
                Hoàn thiện thông tin người đăng
            </Typography.Title>
            <div id="loading" className="loader-line hide-loader"></div>

            <Form form={form} layout="vertical" className="form" onFinish={hanldeSubmitForm}>
                <Form.Item className="form__item mb-1">
                    <Form.Item
                        name="name"
                        label="Họ và tên"
                        required={false}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                        }}
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                    >
                        <Input
                            placeholder="Nhập họ và tên"
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label="Số điện thoại"
                        required={false}
                        style={{
                            display: 'inline-block',
                            width: '50%',
                            marginLeft: '8px',
                        }}
                        rules={[{ required: true, message: 'Vui lòng nhấp số điện thoại!' }]}
                    >
                        <Input
                            placeholder="Nhập số điện thoại"
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    className="form__item"
                    onClick={showModal}
                    required={false}
                    rules={[{ required: true, message: 'Vui lòng chọn địa chỉ!' }]}
                >
                    <Input readOnly placeholder="Chọn loại phòng cho thuê"></Input>
                </Form.Item>
                <Form.Item className="form__item mb-1">
                    <Form.Item
                        name="gender"
                        label="Giới tính"
                        required={false}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                        }}
                        rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                    >
                        <Select showSearch placeholder="Chọn loại giới tính" optionFilterProp="children">
                            <Select.Option value="MALE">Nam</Select.Option>
                            <Select.Option value="FEMALE">Nữ</Select.Option>
                            <Select.Option value="OTHER">Khác</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="idCard"
                        label="Số CMND/CCCD"
                        required={false}
                        style={{
                            display: 'inline-block',
                            width: '50%',
                            marginLeft: '8px',
                        }}
                        rules={[{ required: true, message: 'Vui lòng nhập số CMND/CCCD!' }]}
                    >
                        <Input
                            placeholder="Nhập số CMND/CCCD"
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    name="birthDate"
                    label="Ngày sinh"
                    className="form__item"
                    required={false}
                    rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                >
                    <DatePicker
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <Form.Item className="form__item">
                    <Button className="form__btn" type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
            <AddressModal open={visibleModal} onCancel={hanldeCanleModal} onOk={hanldeSubmitAddress} />
            {contextHolderMessage}
        </div>
    );
};
export default SignUpHost;
