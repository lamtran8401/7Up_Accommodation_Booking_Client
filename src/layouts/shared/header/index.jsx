import logo from '@/assets/images/logo.png';
import Search from '@/components/search';
import useAuth from '@/hooks/useAuth';
import { InboxStackIcon, MagnifyingGlassPlusIcon, PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button, Divider, Dropdown, Layout, Modal } from 'antd';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import './style.scss';
import { LogoutOutlined, SettingOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Header = () => {
    const [currentUser, , logout, hasPermission] = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        navigate('/signup-host');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    console.log(currentUser);
    const handleLogout = () => {
        window.location.reload();
        logout();
    };
    const items = [
        {
            key: '1',
            label: (
                <Link to="/signup-host" className="btn-action">
                    <span>Quản lý tài khoản</span>
                </Link>
            ),
            icon: <UserOutlined />,
        },
        {
            key: '2',
            label: (
                <Link to="/signup-host" className="btn-action">
                    <span>Cài đặt</span>
                </Link>
            ),
            icon: <SettingOutlined />,
        },
        {
            key: '3',
            label: <a onClick={handleLogout}>Đăng xuất</a>,
            icon: <LogoutOutlined />,
        },
    ];

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
                {!currentUser?.username ? (
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
                            {hasPermission('HOST') ? (
                                <Link to="/post-room" className="btn-action btn-text-color">
                                    <PencilSquareIcon className="icon" />
                                    <span>Đăng tin</span>
                                </Link>
                            ) : (
                                <Link className="btn-action btn-text-color" onClick={showModal}>
                                    <PencilSquareIcon className="icon" />
                                    <span>Đăng tin</span>
                                </Link>
                            )}
                        </Button>
                        <Link to="/manage-post" className="btn-action">
                            <InboxStackIcon className="icon" />
                            <span>Quản lý tin</span>
                        </Link>
                        <Link to="/search-plus" className="btn-action">
                            <MagnifyingGlassPlusIcon className="icon" />
                            <span>Tìm nâng cao</span>
                        </Link>
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <Link className="btn-action">
                                <UserCircleIcon className="icon" />
                                <span>Tài khoản</span>
                            </Link>
                        </Dropdown>
                    </>
                )}
            </div>
            <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn chưa đăng ký tài khoản môi giới. Đăng ký ngay !</p>
            </Modal>
        </Layout.Header>
    );
};

export default Header;
