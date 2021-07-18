import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import LoginPass from '../components/auth/LoginPass'
import LoginSMS from '../components/auth/LoginSMS'
import SocialLogin from '../components/auth/SocialLogin'

import { RootStore } from '../utils/TypeScript'

const Login = () => {
  const [sms, setSms] = useState(false)
  const history = useHistory()

  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if (auth.access_token) history.push('/')
  }, [auth.access_token, history])

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-center text-uppercase mb-4">Login</h3>

        <SocialLogin />

        {sms ? <LoginSMS /> : <LoginPass />}

        <small className="row my-2 text-primary">
          <span className="col-6">
            <Link to="/forgot_password">Forgot password?</Link>
          </span>

          <span
            className="col-6 text-end"
            style={{ cursor: 'pointer' }}
            onClick={() => setSms(!sms)}
          >
            {sms ? 'Sign in with password' : 'Sign in with SMS'}
          </span>
        </small>

        <p className="mt-2">
          You don't have an account?
          <Link to="/register" className="ms-2" style={{ color: 'crimson' }}>
            Register Now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
