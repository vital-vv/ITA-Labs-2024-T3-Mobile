import {showToast} from '../../../components/toasts';
import {UserUpdateParams, UserUpdateResponse} from '../../../types/api/users';
import {ToastTypes} from '../../../types/toasts';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const editUser = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    editUser: builder.mutation<UserUpdateResponse, UserUpdateParams>({
      query: body => ({
        url: API_URL.users,
        method: 'PUT',
        body,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          showToast(ToastTypes.Success, 'User was successfully updated!');
        } catch (e) {
          showToast(
            ToastTypes.Error,
            'Something went wrong during user update',
          );
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});
