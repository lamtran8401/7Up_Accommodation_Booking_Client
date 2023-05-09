import AuthLayout from '@/layouts/auth';
import MainLayout from '@/layouts/main';
import IndexPage from '@/pages';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import PostRoom from '@/pages/post_room';
import DetailRoom from '@/pages/detail_room';
import { loadRooms } from '@/services/room';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <IndexPage />,
                loader: async () => loadRooms(),
            },
            {
                path: 'rooms/:id',
                element: <DetailRoom/>,
            },
            {
                path: '/post-room',
                element: <PostRoom />,
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
]);

export default router;
