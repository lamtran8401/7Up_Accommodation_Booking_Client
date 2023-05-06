import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [form] = Form.useForm();
    const hanldeSubmitForm = (values) => {
        axios
            .get(
                `${import.meta.env.VITE_API_BASE_URL}/accounts/login?username=${values.username}&password=${
                    values.password
                }`,
            )
            .then((response) => {
                if (response.data) {
                    alert('Đăng nhập thành công');
                } else {
                    alert('Email hoặc mật khẩu không đúng');
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
        </div>
    );
};

export default Login;
