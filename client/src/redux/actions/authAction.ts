import { Dispatch } from 'redux'
import { postAPI } from '../../utils/FetchData'
import { IUserLogin, IUserRegister } from '../../utils/TypeScript'
import { validRegister } from '../../utils/Valid'
import { AUTH, IAuthType } from '../types/authType'
import { ALERT, IAlertType } from '../types/alertType'

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await postAPI('login', userLogin)

      dispatch({ type: AUTH, payload: res.data })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const register =
  (userRegister: IUserRegister) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validRegister(userRegister)
    if (check.errLength > 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })
    }
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI('register', userRegister)
      console.log(res)

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
