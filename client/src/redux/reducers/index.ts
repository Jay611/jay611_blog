import { combineReducers } from 'redux'
import auth from '../reducers/authReducer'
import alert from '../reducers/alertReducer'

export default combineReducers({
  auth,
  alert
})
