import { combineReducers } from 'redux'
import auth from '../reducers/authReducer'
import alert from '../reducers/alertReducer'
import categories from '../reducers/categoryReducer'
import homeBlogs from '../reducers/homeBlogsReducer'

export default combineReducers({
  auth,
  alert,
  categories,
  homeBlogs,
})
