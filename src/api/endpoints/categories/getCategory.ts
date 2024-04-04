import {SubCategory} from '../../../types/api/lots';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getCategory = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getCategory: builder.query<SubCategory, number>({
      query: id => ({
        url: API_URL.category(id),
        method: 'GET',
      }),
    }),
  }),
});
