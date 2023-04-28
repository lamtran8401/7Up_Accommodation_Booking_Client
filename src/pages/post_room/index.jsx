import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Typography, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import AddressModal from '../../components/modal-address';
import { storage } from '../../config/firebase';
import { errorMessageCounDown, successMessageCounDown } from '../../config/utils';
import './PostRoom.scss';
const PostRoom = () => {
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

    //Submit form
    const hanldeUploadFileToFirebase = () => {
        const files = fileList.map((file) => file.originFileObj);
        files.map((file) => {
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            promises.push(uploadTask);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    console.log('upload image successfull');
                },
                (err) => {
                    console.log(err.serverResponse);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                },
            );
        });
    };
    const hanldeSubmitForm = (values) => {
        values.images = fileList.map((file) => file.name);
        values.location = addressObj;
        let loading = document.getElementById('loading');
        loading.classList.remove('hide-loader');
        loading.classList.add('show-loader');
        axios
            .post(`${import.meta.env.VITE_API_BASE_URL}/rooms/create/1`, values)
            .then((response) => {
                hanldeUploadFileToFirebase();
                Promise.all(promises)
                    .then(() => {
                        form.resetFields();
                        setFileList([]);
                        loading.classList.remove('show-loader');
                        loading.classList.add('hide-loader');
                        successMessageCounDown(5, 'Đăng tin thành công', modalMessage);
                    })
                    .catch((err) => {
                        console.log(err);
                        errorMessageCounDown(5, 'Tải ảnh thất bại', modalMessage);
                    });
            })
            .catch((response) => {
                //handle error
                loading.classList.remove('show-loader');
                loading.classList.add('hide-loader');
                errorMessageCounDown(5, 'Đăng tin thất bại', modalMessage);
                console.log(response);
            });
    };

    //Modal address
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

    //Upload file
    const handleCancelModelImage = () => {
        setPreviewOpen(false);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await readURL(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const readURL = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
        });
    };
    const handleChangeImage = (info) => {
        if (isUpload(info)) {
            info.file.status = 'done';
            setFileList(info.fileList);
        }
    };
    const isUpload = (info) => {
        const isImage = info.file.type.startsWith('image/');
        const isLt2M = info.file.size / 1024 / 1024 < 2;
        if (!isImage) {
            message.error('Chỉ được upload file ảnh!');
            return false;
        }
        if (!isLt2M) {
            message.error('Ảnh có kích thức nhỏ hơn 2MB!');
            return false;
        }
        if (info.fileList.length > maxFile) {
            message.error(`Chỉ được phép upload tối đa ${maxFile} ảnh`);
            return false;
        }
        return true;
    };

    const uploadButton = (
        <div>
            {contextHolder}
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    //Render
    return (
        <div className="post_room">
            <Typography.Title level={2} className="form__title">
                Đăng tin
            </Typography.Title>
            <div id="loading" className="loader-line hide-loader"></div>
            <Row>
                <Col span={8}>
                    <div className="title-upload">
                        <h3> Upload ảnh</h3>
                        <span className="note" style={{ marginBottom: '10px' }}>
                            Ảnh có kích thước tối đa 2M ,tối đa 8 ảnh, ảnh đầu tiên mặc định là ảnh đại diện
                        </span>
                    </div>

                    <Upload
                        multiple
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChangeImage}
                    >
                        {fileList.length >= maxFile ? null : uploadButton}
                    </Upload>
                </Col>
                <Col span={16}>
                    <Form form={form} layout="vertical" className="form" onFinish={hanldeSubmitForm}>
                        <Form.Item
                            name="type"
                            label="Loại phòng"
                            className="form__item"
                            required={false}
                            rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
                        >
                            <Select showSearch placeholder="Chọn loại phòng cho thuê" optionFilterProp="children">
                                <Select.Option value="MOTEL">Phòng trọ</Select.Option>
                                <Select.Option value="APARTMENT">Chung cư</Select.Option>
                                <Select.Option value="HOUSE">Nhà nguyên căn</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="Địa chỉ"
                            className="form__item"
                            required={false}
                            onClick={showModal}
                            rules={[{ required: true, message: 'Vui lòng chọn địa chỉ!' }]}
                        >
                            <Input readOnly placeholder="Chọn loại phòng cho thuê"></Input>
                        </Form.Item>
                        <Form.Item
                            name="iteriorStatus"
                            label="Tình trạng nội thất"
                            className="form__item"
                            required={false}
                            rules={[{ required: true, message: 'Vui lòng chọn tình trạng nội thất!' }]}
                        >
                            <Select showSearch placeholder="Chọn tình trạng nội thất" optionFilterProp="children">
                                <Select.Option value="FULL">Nội thất đầy đủ</Select.Option>
                                <Select.Option value="EMPTY">Trống</Select.Option>
                                <Select.Option value="LUXURY">Nội thất cao cấp</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="size"
                            label="Diện tích (m2)"
                            className="form__item"
                            required={false}
                            rules={[{ required: true, message: 'Vui lòng nhập diện tích!' }]}
                        >
                            <InputNumber
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Nhập diện tích"
                            />
                        </Form.Item>
                        <Form.Item className="form__item mb-1">
                            <Form.Item
                                name="rentCost"
                                label="Giá thuê (VND/tháng)"
                                required={false}
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(50% - 8px)',
                                }}
                                rules={[{ required: true, message: 'Vui lòng nhập giá thuê!' }]}
                            >
                                <InputNumber
                                    placeholder="Nhập giá thuê"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="diposit"
                                label="Tiền cọc (VND)"
                                required={false}
                                style={{
                                    display: 'inline-block',
                                    width: '50%',
                                    marginLeft: '8px',
                                }}
                                rules={[{ required: true, message: 'Vui lòng nhập diện tích!' }]}
                            >
                                <InputNumber
                                    placeholder="Nhập tiền cọc"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item className="form__item mb-1">
                            <Form.Item
                                name="bedRoomNumber"
                                label="Số phòng ngủ"
                                required={false}
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(50% - 8px)',
                                }}
                                rules={[{ required: true, message: 'Vui lòng nhập số phòng ngủ!' }]}
                            >
                                <InputNumber
                                    placeholder="Nhập số phòng ngủ"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="bathRoomNumber"
                                label="Số phòng vệ sinh"
                                required={false}
                                style={{
                                    display: 'inline-block',
                                    width: '50%',
                                    marginLeft: '8px',
                                }}
                                rules={[{ required: true, message: 'Vui lòng nhập số phòng vệ sinh!' }]}
                            >
                                <InputNumber
                                    placeholder="Nhập số phòng vệ sinh"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="Tiêu đề"
                            className="form__item"
                            required={false}
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                        >
                            <Input placeholder="Nhập tiêu đề"></Input>
                        </Form.Item>
                        <Form.Item name="description" label="Mô tả" className="form__item">
                            <TextArea placeholder="Nhập mô tả" rows={4} />
                        </Form.Item>
                        <Form.Item className="form__item">
                            <Button className="form__btn" type="primary" htmlType="submit">
                                Đăng tin
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelModelImage}>
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
export default PostRoom;
