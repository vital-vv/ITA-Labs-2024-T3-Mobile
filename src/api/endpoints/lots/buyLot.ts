import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const buyLot = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    buyLot: builder.mutation<string, number>({
      query: id => ({
        url: API_URL.lotBuy(id),
        method: 'POST',
        body: id,
      }),
      invalidatesTags: ['Bets'],
    }),
  }),
});
