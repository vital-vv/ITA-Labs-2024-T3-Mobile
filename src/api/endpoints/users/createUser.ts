import {showToast} from '../../../components/toasts';
import {UserCreateParams, UserCreateResponse} from '../../../types/api/users';
import {ToastTypes} from '../../../types/toasts';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const createUser = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation<UserCreateResponse, UserCreateParams>({
      query: userData => ({
        url: API_URL.users,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          showToast(ToastTypes.Success, 'Registration was successful!');
        } catch (e) {
          showToast(
            ToastTypes.Error,
            'Something went wrong during registration',
          );
        }
      },
    }),
  }),
});
