import { Footer, Header } from '@/layouts/shared';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './style.scss';

const MainLayout = () => (
    <>
        <Header />
        <Layout.Content className="container">
            <Outlet />
        </Layout.Content>
        <Footer />
    </>
);

export default MainLayout;
