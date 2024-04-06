import {MyAdsResponse} from '../../../types/api/lots';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getUserBoughtLots = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getUserBoughtLots: builder.query<MyAdsResponse, void>({
      query: () => ({
        url: API_URL.userBoughtLots,
        method: 'GET',
      }),
      providesTags: ['Bought'],
    }),
  }),
});
