import {LotsInSubCategoryResponse} from '../../../types/api/api';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getLotsInSubCategory = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getLotsInSubCategory: builder.query<LotsInSubCategoryResponse, number>({
      query: id => ({
        url: API_URL.lotsInSubCategory(id),
        method: 'GET',
      }),
    }),
  }),
});
