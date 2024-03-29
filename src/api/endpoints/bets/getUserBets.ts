import {MyBetsResponse} from '../../../types/api/bids';
import {BidStatus} from '../../../types/api/info';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const getUserBets = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getUserBets: builder.query<MyBetsResponse, BidStatus>({
      query: status => ({
        url: API_URL.userBets(status),
        method: 'GET',
      }),
      providesTags: ['Bets'],
    }),
  }),
});
