import { LotsInSubCategoryResponse } from '../../../types/api/api';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getUserLeadingBets = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getUserLeadingBets: builder.query<LotsInSubCategoryResponse, number>({
      query: id => ({
        url: API_URL.userLeadingBets(id),
        method: 'GET',
      }),
    }),
  }),
});
