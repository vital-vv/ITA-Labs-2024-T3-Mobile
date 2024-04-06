import {showToast} from '../../../components/toasts';
import {Lot} from '../../../types/api/lots';
import {ToastTypes} from '../../../types/toasts';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const deactivateLot = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    deactivateLot: builder.mutation<Lot, number>({
      query: id => ({
        url: API_URL.lotDeactivate(id),
        method: 'POST',
        body: id,
      }),

      invalidatesTags: ['MyAds'],

      async onQueryStarted() {
        try {
          showToast(ToastTypes.Success, 'Lot was successfully deactivated!');
        } catch (e) {
          showToast(
            ToastTypes.Error,
            'Something went wrong during lot deactivation',
          );
        }
      },
    }),
  }),
});
