import logo from '@/assets/images/logo.png';
import { Button, Divider, Layout } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';

const Header = () => {
    return (
        <Layout.Header id="header" className="container">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" loading="lazy" className="logo-img" />
                    <span>SVHost</span>
                </Link>
            </div>
            <div className="top-action">
                <Link to="/auth/register" className="btn-action">
                    Tạo tài khoản
                </Link>
                <Divider type="vertical" />
                <Link to="/auth/login" className="btn-action">
                    <Button type="primary">Đăng nhập</Button>
                </Link>
            </div>
        </Layout.Header>
    );
};

export default Header;
