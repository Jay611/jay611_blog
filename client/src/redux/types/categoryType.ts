import { ICategory } from '../../utils/TypeScript'

export const CREATE_CATEGORY = 'CREATE_CATEGORY'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
export const DELETE_CATEGORIES = 'DELETE_CATEGORIES'

export interface ICreateCategory {
  type: typeof CREATE_CATEGORY
  payload: ICategory
}

export interface IGetCategories {
  type: typeof GET_CATEGORIES
  payload: ICategory[]
}

export interface IUpdateCategory {
  type: typeof UPDATE_CATEGORIES
  payload: ICategory
}

export interface IDeleteCategory {
  type: typeof DELETE_CATEGORIES
  payload: string
}

export type ICategoryType =
  | ICreateCategory
  | IGetCategories
  | IUpdateCategory
  | IDeleteCategory
