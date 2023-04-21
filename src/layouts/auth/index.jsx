import { Link, Outlet } from 'react-router-dom'
import './Form.scss'
import './style.scss'

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__logo'>
        <Link to='/'>
          Home
          {/* <img src={logo} alt='Brand Logo' loading='lazy' className='auth-layout__logo' /> */}
        </Link>
      </div>
      <div>hello</div>
      <Outlet />
    </div>
  )
}

export default AuthLayout
