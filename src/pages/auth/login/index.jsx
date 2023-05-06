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
                Sign in to your account
            </Typography.Title>
            <Form form={form} layout="vertical" className="form sign--form" onFinish={hanldeSubmitForm}>
                <Form.Item
                    name="username"
                    label="Email Address"
                    className="form__item"
                    required={false}
                    rules={[
                        { required: true, message: 'Please input your Username!' },
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                    ]}
                >
                    <Input placeholder="Type your email address here..." prefix={<UserIcon className="form__icon" />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    className="form__item"
                    required={false}
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<LockClosedIcon className="form__icon" />}
                        iconRender={(visible) => (visible ? <EyeIcon /> : <EyeSlashIcon />)}
                        placeholder="Type your password here..."
                    />
                </Form.Item>
                <Form.Item className="form-other-action">
                    <Checkbox className="form__remember">Remember me</Checkbox>
                    <Link to="#" className="link">
                        Forgot your password?
                    </Link>
                </Form.Item>
                <Form.Item className="form__item">
                    <Button className="form__btn" type="primary" htmlType="submit">
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
            <div className="form-redirect">
                <span>
                    Do not have an account?{' '}
                    <Link to="/auth/register" className="link">
                        Sign up now
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Login;
