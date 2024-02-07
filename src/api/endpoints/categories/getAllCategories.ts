import {Category} from '../../../types/api/api';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getAllCategories = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: API_URL.categories,
        method: 'GET',
      }),
    }),
  }),
});
