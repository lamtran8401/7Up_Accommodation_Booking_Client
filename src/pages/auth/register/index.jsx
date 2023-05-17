import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { Button, Form, Input, Modal, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { errorMessageCounDown, successMessageCounDown } from '../../../config/utils';
import axios from 'axios';

const Register = () => {
    const [form] = Form.useForm();
    const [modalMessage, contextHolderMessage] = Modal.useModal();
    const naviagte = useNavigate();
    const hanldeSubmitForm = (values) => {
        loading.classList.remove('hide-loader');
        loading.classList.add('show-loader');
        values.type = 'NORMAL';
        axios
            .post(`${import.meta.env.VITE_API_BASE_URL}/accounts/register`, values)
            .then((response) => {
                if (response.data) {
                    naviagte('/auth/login');
                }
            })
            .catch((response) => {
                console.log(response.response);
                loading.classList.add('hide-loader');
                loading.classList.remove('show-loader');
                if (response.response.data.status == 409) {
                    errorMessageCounDown(5, 'Email đã tồn tại', modalMessage);
                } else {
                    errorMessageCounDown(5, 'Đăng ký thất bại', modalMessage);
                }
            });
    };
    return (
        <div className="register">
            <Typography.Title level={2} className="form__title">
                Đăng ký
            </Typography.Title>
            <div id="loading" className="loader-line hide-loader"></div>
            <Form form={form} layout="vertical" className="form sign-up-form" onFinish={hanldeSubmitForm}>
                <Form.Item
                    name="username"
                    label="Email"
                    className="form__item"
                    required={false}
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        {
                            type: 'email',
                            message: 'Email không hợp lệ',
                        },
                    ]}
                >
                    <Input placeholder="Nhập email ở đây." prefix={<EnvelopeIcon className="form__icon" />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    className="form__item"
                    required={false}
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password
                        prefix={<LockClosedIcon className="form__icon" />}
                        iconRender={(visible) => (visible ? <EyeIcon /> : <EyeSlashIcon />)}
                        placeholder="Nhâp mật khẩu ở đây"
                    />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    className="form__item"
                    required={false}
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                        ({ getFieldValue }) => ({
                            validator: (_, value) => {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockClosedIcon className="form__icon" />}
                        iconRender={(visible) => (visible ? <EyeIcon /> : <EyeSlashIcon />)}
                        placeholder=""
                    />
                </Form.Item>
                <Form.Item className="form__item">
                    <Button className="form__btn" type="primary" htmlType="submit">
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
            <div className="form-redirect">
                <span>
                    Bạn đã có tài khoản?{' '}
                    <Link to="/auth/login" className="link">
                        Đăng nhập ngay
                    </Link>
                </span>
            </div>
            {contextHolderMessage}
        </div>
    );
};

export default Register;
