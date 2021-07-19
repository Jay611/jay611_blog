import React from 'react'

import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite'
import {
  FacebookLogin,
  FacebookLoginAuthResponse,
} from 'react-facebook-login-lite'

import { useDispatch } from 'react-redux'
import { googleLogin, facebookLogin } from '../../redux/actions/authAction'

const SocialLogin = () => {
  const dispatch = useDispatch()

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token
    dispatch(googleLogin(id_token))
  }

  const onFBSuccess = (response: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = response.authResponse
    dispatch(facebookLogin(accessToken, userID))
  }

  return (
    <>
      <div className="my-2">
        <GoogleLogin
          client_id={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
          cookiepolicy="single_host_origin"
          onSuccess={onSuccess}
        />
      </div>

      <div className="my-2">
        <FacebookLogin
          appId={`${process.env.REACT_APP_FACEBOOK_CLIENT_ID}`}
          onSuccess={onFBSuccess}
        />
      </div>
    </>
  )
}

export default SocialLogin
