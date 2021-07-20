import { Dispatch } from 'redux'
import { deleteAPI, getAPI, patchAPI, postAPI } from '../../utils/FetchData'
import { ICategory } from '../../utils/TypeScript'
import { ALERT, IAlertType } from '../types/alertType'
import * as cateTypes from '../types/categoryType'

export const createCategory =
  (name: string, token: string) =>
  async (dispatch: Dispatch<cateTypes.ICategoryType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI('category', { name }, token)

      dispatch({
        type: cateTypes.CREATE_CATEGORY,
        payload: res.data.newCategory,
      })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.mag } })
    }
  }

export const getCategories =
  () => async (dispatch: Dispatch<cateTypes.ICategoryType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await getAPI('category')

      dispatch({ type: cateTypes.GET_CATEGORIES, payload: res.data.categories })

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.mag } })
    }
  }

export const updateCategory =
  (data: ICategory, token: string) =>
  async (dispatch: Dispatch<cateTypes.ICategoryType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      dispatch({ type: cateTypes.UPDATE_CATEGORIES, payload: data })

      const res = await patchAPI(
        `category/${data._id}`,
        { name: data.name },
        token
      )

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data } })
    }
  }

export const deleteCategory =
  (id: string, token: string) => async (dispatch: Dispatch<cateTypes.ICategoryType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      dispatch({type:cateTypes.DELETE_CATEGORIES, payload: id})

      const res = await deleteAPI(`category/${id}`, token)

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
