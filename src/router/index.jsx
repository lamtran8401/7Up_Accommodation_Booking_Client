import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/auth'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'

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
])

export default router
