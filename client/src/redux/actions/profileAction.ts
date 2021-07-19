import { Dispatch } from 'react'
import { checkImage, imageUpload } from '../../utils/ImageUpload'
import { ALERT, IAlertType } from '../types/alertType'
import { IAuth, IAuthType } from '../types/authType'

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
      console.log(photo)
      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
