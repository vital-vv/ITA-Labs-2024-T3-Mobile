import {showToast} from '../../../components/toasts';
import {Lot} from '../../../types/api/lots';
import {ToastTypes} from '../../../types/toasts';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const confirmLot = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    confirmLot: builder.mutation<Lot, number>({
      query: id => ({
        url: API_URL.lotConfirm(id),
        method: 'POST',
        body: id,
      }),

      invalidatesTags: ['MyAds'],

      async onQueryStarted() {
        try {
          showToast(ToastTypes.Success, 'Deal was successfully confirmed!');
        } catch (e) {
          showToast(
            ToastTypes.Error,
            'Something went wrong during deal confirm',
          );
        }
      },
    }),
  }),
});
