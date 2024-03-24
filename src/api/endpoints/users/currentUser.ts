import {showToast} from '../../../components/toasts';
import {currentUserActions} from '../../../store/slices/currentUserSlice';
import {UserRoles} from '../../../types/api/info';
import {CurrentUserResponse} from '../../../types/api/users';
import {ToastTypes} from '../../../types/toasts';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';
import {signOut} from 'aws-amplify/auth';

export const getCurrentUser = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<CurrentUserResponse, void>({
      query: () => ({
        url: API_URL.currentUser,
      }),
      providesTags: ['User'],
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const result = await queryFulfilled;
          const {
            first_name,
            last_name,
            phoneNumber,
            preferred_currency,
            role,
            email,
            photo,
          } = (await queryFulfilled).data;

          if (role === UserRoles.Admin) {
            dispatch(currentUserActions.setCurrentUserAsGuest());
            showToast(ToastTypes.Warning, 'Sorry, you cannot login as Admin');
          }

          dispatch(currentUserActions.setCurrentUserAsLogedIn());
          dispatch(
            currentUserActions.setCurrentUserInfo({
              name: first_name,
              surname: last_name,
              phone: phoneNumber,
              currency: preferred_currency,
              photo,
              email,
              role,
            }),
          );
        } catch (e: any) {
          const {status} = e.error;
          if (status === 404) {
            dispatch(
              currentUserActions.setCurrentUserAsLogedInAndNotOnboarded(),
            );
          }
          //temporary 401 status checking (backend have a permission bug for new users)
          if (status === 401) {
            await signOut();
            showToast(ToastTypes.Error, 'Something went wrong');
          } else {
            dispatch(currentUserActions.setCurrentUserAsGuest());
          }
        }
      },
    }),
  }),
});
