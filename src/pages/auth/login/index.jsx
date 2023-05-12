import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { Button, Checkbox, Form, Input, Modal, Typography } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { errorMessageCounDown, successMessageCounDown } from '../../../config/utils';
import { AuthContext } from '@/context/authContext';
import { useContext } from 'react';

const Login = () => {
    const [form] = Form.useForm();
    const [modalMessage, contextHolderMessage] = Modal.useModal();
    const naviagte = useNavigate();
    const [, setCurrentUser] = useContext(AuthContext);
    const hanldeSubmitForm = (values) => {
        loading.classList.remove('hide-loader');
        loading.classList.add('show-loader');
        axios
            .get(
                `${import.meta.env.VITE_API_BASE_URL}/accounts/login?username=${values.username}&password=${
                    values.password
                }`,
            )
            .then((response) => {
                if (response.data) {
                    console.log(response.data);
                    setCurrentUser(response.data);
                    naviagte('/');
                } else {
                    loading.classList.add('hide-loader');
                    loading.classList.remove('show-loader');
                    errorMessageCounDown(5, 'Email hoặc mật khẩu không đúng', modalMessage);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="login">
            <Typography.Title level={2} className="form__title">
                Đăng nhập
            </Typography.Title>
            <div id="loading" className="loader-line hide-loader"></div>
            <Form form={form} layout="vertical" className="form sign--form" onFinish={hanldeSubmitForm}>
                <Form.Item
                    name="username"
                    label="Địa chỉ email"
                    className="form__item"
                    required={false}
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        {
                            type: 'email',
                            message: 'Email không hợp lệ!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập email ở đây..." prefix={<UserIcon className="form__icon" />} />
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
                        placeholder="Nhập mật khẩu ở đây..."
                    />
                </Form.Item>
                <Form.Item className="form-other-action">
                    <Checkbox className="form__remember">Nhớ mật khẩu</Checkbox>
                    <Link to="#" className="link">
                        Bạn quên mật khẩu ?
                    </Link>
                </Form.Item>
                <Form.Item className="form__item">
                    <Button className="form__btn" type="primary" htmlType="submit">
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
            <div className="form-redirect">
                <span>
                    Bạn có muốn tạo tài khoản không ?{' '}
                    <Link to="/auth/register" className="link">
                        Đăng ký ngay
                    </Link>
                </span>
            </div>
            {contextHolderMessage}
        </div>
    );
};

export default Login;
