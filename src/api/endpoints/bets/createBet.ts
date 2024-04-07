import {showToast} from '../../../components/toasts';
import {Bet} from '../../../types/api/bids';
import {ToastTypes} from '../../../types/toasts';
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
      async onQueryStarted() {
        try {
          showToast(ToastTypes.Success, 'Your bet was successfully placed!');
        } catch (e) {
          showToast(
            ToastTypes.Error,
            'Something went wrong during placing your bet',
          );
        }
      },
    }),
  }),
});
