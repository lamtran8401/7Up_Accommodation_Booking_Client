import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/auth'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import PostRoom from '../pages/post_room'


const router = createBrowserRouter([
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
  {
    path:'/post_room',
    element: <PostRoom />,
  }
])

export default router
