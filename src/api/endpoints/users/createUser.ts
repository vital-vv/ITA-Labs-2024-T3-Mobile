import {showToast} from '../../../components/toasts';
import {EndpointWithMediaHeader} from '../../../constants/endpointWithMediaHeaders';
import {ROUTES} from '../../../constants/routes';
import {globalNavigate} from '../../../navigation/globalNavigation';
import {currentUserActions} from '../../../store/slices/currentUserSlice';
import {UserCreateResponse} from '../../../types/api/users';
import {ToastTypes} from '../../../types/toasts';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const createUser = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    [EndpointWithMediaHeader.CreateUser]: builder.mutation<
      UserCreateResponse,
      FormData
    >({
      query: userData => ({
        url: API_URL.users,
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          //updata state from response data if user was successfully created
          // (don't need to fetch user data one more time)
          const userData = (await queryFulfilled).data;
          dispatch(currentUserActions.setCurrentUserAsLogedIn());
          dispatch(currentUserActions.setCurrentUserInfo({...userData}));
          globalNavigate(ROUTES.HomeStack, {screen: ROUTES.Home});
          showToast(ToastTypes.Success, 'Registration was successful!');
        } catch (e) {
          console.log(e);
          showToast(
            ToastTypes.Error,
            'Something went wrong during registration',
          );
        }
      },
    }),
  }),
});
