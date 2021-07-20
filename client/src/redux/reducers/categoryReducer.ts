import { ICategory } from '../../utils/TypeScript'
import * as cateTypes from '../types/categoryType'

const categoryReducer = (
  state: ICategory[] = [],
  action: cateTypes.ICategoryType
): ICategory[] => {
  switch (action.type) {
    case cateTypes.CREATE_CATEGORY:
      return [action.payload, ...state]

    case cateTypes.GET_CATEGORIES:
      return action.payload

    case cateTypes.UPDATE_CATEGORIES:
      return state.map((item) =>
        item._id === action.payload._id
          ? { ...item, name: action.payload.name }
          : item
      )

    case cateTypes.DELETE_CATEGORIES:
      return state.filter((item) => item._id !== action.payload)

    default:
      return state
  }
}

export default categoryReducer
