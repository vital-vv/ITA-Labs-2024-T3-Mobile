import {getAllCategories} from './categories/getAllCategories';
import {getCategory} from './categories/getCategory';
import {getLotsInSubCategory} from './categories/getLotsInSubCategory';
import {getLot} from './lots/getLot';
import {getAllDataSelection} from './selection/getAllDataSelection';
import {createLot} from './lots/createLot';
import {createUser} from './users/createUser';
import {editUser} from './users/editUser';

export const {useGetCategoryQuery, useLazyGetCategoryQuery} = getCategory;

export const {useGetAllCategoriesQuery, useLazyGetAllCategoriesQuery} =
  getAllCategories;

export const {useGetLotsInSubCategoryQuery, useLazyGetLotsInSubCategoryQuery} =
  getLotsInSubCategory;
export const {useGetLotQuery, useLazyGetLotQuery} = getLot;

export const {useGetAllSelectionQuery, useLazyGetAllSelectionQuery} =
  getAllDataSelection;

export const {useCreateLotMutation} = createLot;

export const {useCreateUserMutation} = createUser;

export const {useEditUserMutation} = editUser;
