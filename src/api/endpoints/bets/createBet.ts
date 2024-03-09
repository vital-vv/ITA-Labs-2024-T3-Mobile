import {Bet} from '../../../types/api/api';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const createBet = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    createBet: builder.mutation<Bet, Object>({
      query: (post) => ({
        url: API_URL.bets,
        method: 'POST',
        body: post,
      }),
    }),
  }),
});
