import {showToast} from '../../../components/toasts';
import {ROUTES} from '../../../constants/routes';
import {globalNavigate} from '../../../navigation/globalNavigation';
import {logout} from '../../../store/functions/userActions';
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
          const userData = (await queryFulfilled).data;
          if (userData.role === UserRoles.Admin) {
            dispatch(logout);
            showToast(ToastTypes.Warning, 'Sorry, you cannot login as Admin');
          }
          dispatch(currentUserActions.setCurrentUserAsLogedIn());
          dispatch(currentUserActions.setCurrentUserInfo({...userData}));
          globalNavigate(ROUTES.HomeStack, {screen: ROUTES.Home});
        } catch (e: any) {
          const {status} = e.error;
          if (status === 404) {
            dispatch(
              currentUserActions.setCurrentUserAsLogedInAndNotOnboarded(),
            );
            globalNavigate(ROUTES.OnBoarding);
          } else {
            dispatch(currentUserActions.setCurrentUserAsGuest());
          }
        }
      },
    }),
  }),
});
