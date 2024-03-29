import { Bet } from '../../../types/api/bids';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const createBet = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    createBet: builder.mutation<Bet, Bet>({
      query: post => ({
        url: API_URL.bets,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Bets'],
    }),
  }),
});
