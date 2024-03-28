import {MyBetsInResponse} from '../../../types/api/lots';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getUserBets = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getUserBets: builder.query<MyBetsInResponse, string>({
      query: (status) => ({
        url: API_URL.userBets(status),
        method: 'GET',
      }),
      providesTags: ['Bets'],
    }),
  }),
});
