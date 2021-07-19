import { Dispatch } from 'react'
import { patchAPI } from '../../utils/FetchData'
import { checkImage, imageUpload } from '../../utils/ImageUpload'
import { checkPassword } from '../../utils/Valid'
import { ALERT, IAlertType } from '../types/alertType'
import { AUTH, IAuth, IAuthType } from '../types/authType'

export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    if (!auth.access_token || !auth.user) return
    let url = ''
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const check = checkImage(avatar)

      if (check) return dispatch({ type: ALERT, payload: { errors: check } })

      const photo = await imageUpload(avatar)
      url = photo.url

      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            avatar: url ? url : auth.user.avatar,
            name: name ? name : auth.user.name,
          },
        },
      })

      const res = await patchAPI(
        'user',
        {
          avatar: url ? url : auth.user.avatar,
          name: name ? name : auth.user.name,
        },
        auth.access_token
      )

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const resetPassword =
  (password: string, cf_password: string, token: string) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const msg = checkPassword(password, cf_password)
      if (msg) return dispatch({ type: ALERT, payload: { errors: msg } })

      const res = await patchAPI('reset_password', { password }, token)

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
