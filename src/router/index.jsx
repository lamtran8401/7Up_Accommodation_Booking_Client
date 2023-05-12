import { AuthContext } from '@/context/authContext';
import AuthLayout from '@/layouts/auth';
import MainLayout from '@/layouts/main';
import IndexPage from '@/pages';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import RoomDetail from '@/pages/detail_room';
import PostRoom from '@/pages/post_room';
import SignUpHost from '@/pages/sign_up_host';
import { loadRooms } from '@/services/room';
import { useContext } from 'react';
import { Link, createBrowserRouter, Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const [currentUser] = useContext(AuthContext);
    return currentUser != null ? element : <Navigate to="/auth/login" replace />;
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
                element: <SignUpHost />,
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
