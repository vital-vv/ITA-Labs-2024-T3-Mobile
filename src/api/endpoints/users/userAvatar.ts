import {agroexAPI} from '../..';
import {showToast} from '../../../components/toasts';
import {currentUserActions} from '../../../store/slices/currentUserSlice';
import {UserAvatarResponse} from '../../../types/api/users';
import {ToastTypes} from '../../../types/toasts';
import {API_URL} from '../../apiURL';

export const getUserAvatar = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getUserAvatar: builder.query<UserAvatarResponse, string>({
      query: id => ({
        url: API_URL.avatar(id),
        method: 'GET',
      }),
      providesTags: ['User'],

      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {url} = (await queryFulfilled).data;
          dispatch(currentUserActions.setCurrentUserAvatarURL(url));
        } catch (e: any) {
          showToast(
            ToastTypes.Error,
            'Something went wrong during image fetching',
          );
        }
      },
    }),
  }),
});
