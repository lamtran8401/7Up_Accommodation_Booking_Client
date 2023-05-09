import logo from '@/assets/images/logo.png';
import Search from '@/components/search';
import useAuth from '@/hooks/useAuth';
import { InboxStackIcon, MagnifyingGlassPlusIcon, PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button, Divider, Layout } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';

const Header = () => {
    const [currentUser] = useAuth();

    console.log(currentUser);

    return (
        <Layout.Header id="header" className="container">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" loading="lazy" className="logo-img" />
                    <span>SVHost</span>
                </Link>
            </div>
            <Search />
            <div className="top-action">
                {!currentUser?.name ? (
                    <>
                        <Link to="/auth/register" className="btn-action">
                            Tạo tài khoản
                        </Link>
                        <Divider type="vertical" className="btn-action" />
                        <Link to="/auth/login" className="btn-action">
                            <Button type="primary">Đăng nhập</Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Button type="primary" className="btn-action">
                            <PencilSquareIcon className="icon" />
                            <span>Đăng tin</span>
                        </Button>
                        <Link to="/manage-post" className="btn-action">
                            <InboxStackIcon className="icon" />
                            <span>Quản lý tin</span>
                        </Link>
                        <Link to="/search-plus" className="btn-action">
                            <MagnifyingGlassPlusIcon className="icon" />
                            <span>Tìm nâng cao</span>
                        </Link>
                        <Link to="/user" className="btn-action">
                            <UserCircleIcon className="icon" />
                            <span>Tài khoản</span>
                        </Link>
                    </>
                )}
            </div>
        </Layout.Header>
    );
};

export default Header;
