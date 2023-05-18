import { AuthContext } from '@/context/authContext';
import useAuth from '@/hooks/useAuth';
import AuthLayout from '@/layouts/auth';
import MainLayout from '@/layouts/main';
import IndexPage from '@/pages';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import RoomDetail from '@/pages/detail_room';
import ManagePost from '@/pages/manage-post';
import PostRoom from '@/pages/post_room';
import SignUpHost from '@/pages/sign_up_host';
import { loadRooms } from '@/services/room';
import { useContext } from 'react';
import { Link, createBrowserRouter, Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const [currentUser, , logout, hasPermission] = useAuth();
    return hasPermission('HOST') ? element : <Navigate to="/auth/login" replace />;
};
const AdminRoute = ({ element }) => {
    const [currentUser, , logout, hasPermission] = useAuth();
    return hasPermission('ADMIN') ? element : <Navigate to="/auth/login" replace />;
};
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
                element: <RoomDetail />,
            },
            {
                path: '/post-room',
                element: <PrivateRoute element={<PostRoom />} />,
            },
            {
                path: '/signup-host',
                element: <PrivateRoute element={<SignUpHost />} />,
            },
            {
                path: '/manage-post',
                element: <AdminRoute element={<ManagePost />} />,
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
