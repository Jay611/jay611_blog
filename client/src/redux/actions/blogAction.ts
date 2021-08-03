import { Dispatch } from 'react'
import { postAPI } from '../../utils/FetchData'
import { imageUpload } from '../../utils/ImageUpload'
import { IBlog } from '../../utils/TypeScript'
import { ALERT, IAlertType } from '../types/alertType'

export const createBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    try {
      let url = ''

      dispatch({ type: ALERT, payload: { loading: true } })

      if (typeof blog.thumbnail !== 'string') {
        const photo = await imageUpload(blog.thumbnail)
        url = photo.url
      } else {
        url = blog.thumbnail
      }

			const newBlog = {...blog, thumbnail: url}

			const res = await postAPI('blog', newBlog, token)
			console.log(res);

      dispatch({ type: ALERT, payload: { loading: false } })

    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
