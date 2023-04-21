import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { Button, Form, Input, Typography } from 'antd'
import { Link } from 'react-router-dom'

const Register = () => {
  const [form] = Form.useForm()

  return (
    <div className='register'>
      <Typography.Title level={2} className='form__title'>
        Sign up to create your account
      </Typography.Title>
      <Form form={form} layout='vertical' className='form sign-up-form'>
        <Form.Item
          name='name'
          label='Full Name'
          className='form__item'
          required={false}
          rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input
            placeholder='Type your name here...'
            prefix={<UserIcon className='form__icon' />}
          />
        </Form.Item>
        <Form.Item
          name='email'
          label='Email Address'
          className='form__item'
          required={false}
          rules={[
            { required: true, message: 'Please input your Username!' },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}>
          <Input
            placeholder='Type your email address here...'
            prefix={<EnvelopeIcon className='form__icon' />}
          />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          className='form__item'
          required={false}
          rules={[
            { required: true, message: 'Please input your Password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}>
          <Input.Password
            prefix={<LockClosedIcon className='form__icon' />}
            iconRender={visible => (visible ? <EyeIcon /> : <EyeSlashIcon />)}
            placeholder='Type your password here...'
          />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          label='Confirm Password'
          className='form__item'
          required={false}
          rules={[
            { required: true, message: 'Please input your Password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
            ({ getFieldValue }) => ({
              validator: (_, value) => {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              },
            }),
          ]}>
          <Input.Password
            prefix={<LockClosedIcon className='form__icon' />}
            iconRender={visible => (visible ? <EyeIcon /> : <EyeSlashIcon />)}
            placeholder='Type your password again here...'
          />
        </Form.Item>
        <Form.Item className='form__item'>
          <Button className='form__btn' type='primary' htmlType='submit'>
            Sign up
          </Button>
        </Form.Item>
      </Form>
      <div className='form-redirect'>
        <span>
          Already have an account?{' '}
          <Link to='/auth/login' className='link'>
            Sign in now
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Register
