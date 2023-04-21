import { Link, Outlet } from 'react-router-dom'
import './form.scss'
import './style.scss'
import logo from '../../assets/images/logo.png'

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__logo'>
        <Link to='/'>
          <img src={logo} alt='Brand Logo' loading='lazy' className='auth-layout__logo' />
        </Link>
      </div>
      <Outlet />
    </div>
  )
}

export default AuthLayout
