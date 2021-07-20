import { combineReducers } from 'redux'
import auth from '../reducers/authReducer'
import alert from '../reducers/alertReducer'
import categories from '../reducers/categoryReducer'

export default combineReducers({
  auth,
  alert,
  categories,
})
