import {getAllCategories} from './categories/getAllCategories';
import {getCategory} from './categories/getCategory';
import {getLotsInSubCategory} from './categories/getLotsInSubCategory';
import {getLot} from './lots/getLot';
import {getAllDataSelection} from './selection/getAllDataSelection';
import {createLot} from './lots/createLot';
import {createUser} from './users/createUser';
import {editUser} from './users/editUser';
import {getCurrentUser} from './users/currentUser';
import {createBet} from './bets/createBet';
import {getUserBets} from './bets/getUserBets';
import {getCities} from './selection/getCities';

export const {useGetCategoryQuery, useLazyGetCategoryQuery} = getCategory;

export const {useGetAllCategoriesQuery, useLazyGetAllCategoriesQuery} =
  getAllCategories;

export const {useGetLotsInSubCategoryQuery, useLazyGetLotsInSubCategoryQuery} =
  getLotsInSubCategory;
export const {useGetLotQuery, useLazyGetLotQuery} = getLot;

export const {useGetAllSelectionQuery, useLazyGetAllSelectionQuery} =
  getAllDataSelection;

export const {useGetCitiesQuery, useLazyGetCitiesQuery} = getCities;

export const {useCreateLotMutation} = createLot;

export const {useCreateUserMutation} = createUser;

export const {useEditUserMutation} = editUser;

export const {useGetCurrentUserQuery, useLazyGetCurrentUserQuery} =
  getCurrentUser;

export const {useCreateBetMutation} = createBet;

export const {useGetUserBetsQuery, useLazyGetUserBetsQuery} = getUserBets;
