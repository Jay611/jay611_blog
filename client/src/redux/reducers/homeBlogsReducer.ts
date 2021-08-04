import * as blogTypes from '../types/blogType'

const homeBlogsReducer = (
  state: blogTypes.IHomeBlogs[] = [],
  action: blogTypes.IGetHomeBlogsType
):blogTypes.IHomeBlogs[] => {
  switch (action.type) {
    case blogTypes.GET_HOME_BLOGS:
      return action.payload
    default:
      return state
  }
}

export default homeBlogsReducer
