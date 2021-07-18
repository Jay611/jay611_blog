import React from 'react'
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite'
import { useDispatch } from 'react-redux'
import { googleLogin } from '../../redux/actions/authAction'

const SocialLogin = () => {
  const dispatch = useDispatch()

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token
    dispatch(googleLogin(id_token))
  }

  return (
    <div className="my-2">
      <GoogleLogin
        client_id={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        cookiepolicy="single_host_origin"
        onSuccess={onSuccess}
      />
    </div>
  )
}

export default SocialLogin
