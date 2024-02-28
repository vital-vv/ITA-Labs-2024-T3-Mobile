import { LotsInSubCategoryResponse } from '../../../types/api/api';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getUserOutbidBets = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getUserOutbidBets: builder.query<LotsInSubCategoryResponse, number>({
      query: id => ({
        url: API_URL.userOutbidBets(id),
        method: 'GET',
      }),
    }),
  }),
});
