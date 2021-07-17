import { Dispatch } from 'redux'
import { postAPI } from '../../utils/FetchData'
import { IUserLogin } from '../../utils/TypeScript'
import { AUTH, IAuthType } from '../types/authType'

export const login =
  (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType>) => {
    try {
      const res = await postAPI('login', userLogin)

      dispatch({
        type: AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      })
    } catch (err) {
      console.log(err.response.data.msg)
    }
  }
