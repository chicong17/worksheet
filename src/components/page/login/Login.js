import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useDispatch } from 'react-redux'
import styles from './Login.module.scss'
import { typePopup } from '../../index'
import { LOCAL_STORAGE } from '../../constant/localStorage'
import { useNavigate } from 'react-router-dom'
import { loginAccess } from './slice/sliceLogin'
import { login } from '../../service/authService'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const res = await login(values)
      console.log(res)
      setLoading(false)
      await dispatch(
        loginAccess({
          role: res.data.roles[0].title,
          tokenAccess: res.access_token,
          shift: res.data.shifts,
        }),
      )
      const UsedTimeToken = 7200 * 1000
      const timeExpires = Date.now() + UsedTimeToken
      localStorage.setItem(LOCAL_STORAGE.TIME_EXPIRED, timeExpires)
      localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, res.access_token)
      localStorage.setItem(LOCAL_STORAGE.ROLE, res.data.roles[0].title)
      localStorage.setItem(
        LOCAL_STORAGE.INF_USER,
        JSON.stringify({
          avatar: res.data.avatar,
          name: res.data.full_name,
        }),
      )
      typePopup.popupNotice(
        typePopup.SUCCESS_MESSAGE,
        'Success',
        'Login Successful',
      )
      navigate('/', { replace: true })
    } catch (e) {
      form.resetFields(['password'])
      setError(true)
      typePopup.popupNotice(typePopup.ERROR_MESSAGE, 'Failed', 'Login Failed')
      setLoading(false)
    }
  }

  return (
    <>
      <div className={styles.LoginContainer}>
        <Form
          form={form}
          name="basic"
          initialValues={{}}
          onFinish={(values) => onSubmit(values)}
          autoComplete="off"
        >
          <h1 style={{ textAlign: 'center' }}>Log In</h1>
          <Form.Item
            name="email"
            className={styles.InputField}
            rules={[
              {
                required: true,
                message: 'Required to enter email!',
              },
              {
                type: 'email',
                message: 'Enter a valid email address!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Required to enter password!!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className={styles.ItemSignin}>
            <Button
              className={styles.Button}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>
          {error && (
            <p
              style={{ color: 'red', textAlign: 'center', paddingTop: '10px' }}
            >
              Email or Password fail!!
            </p>
          )}
        </Form>
      </div>
    </>
  )
}

export default Login
