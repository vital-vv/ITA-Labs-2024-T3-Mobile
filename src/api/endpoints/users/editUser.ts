import {showToast} from '../../../components/toasts';
import {EndpointWithMediaHeader} from '../../../constants/endpointWithMediaHeaders';
import {ROUTES} from '../../../constants/routes';
import {globalNavigate} from '../../../navigation/globalNavigation';
import {currentUserActions} from '../../../store/slices/currentUserSlice';
import {EditUserParams, UserEditResponse} from '../../../types/api/users';
import {ToastTypes} from '../../../types/toasts';
import {API_URL} from '../../apiURL';
import {agroexAPI} from '../../index';

export const editUser = agroexAPI.injectEndpoints({
  endpoints: builder => ({
    [EndpointWithMediaHeader.EditUser]: builder.mutation<
      UserEditResponse,
      EditUserParams
    >({
      query: userData => ({
        url: API_URL.editUser(userData.isChange),
        method: 'PUT',
        body: userData.data,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          //updata state from response data if user was successfully edited
          const userData = (await queryFulfilled).data;
          dispatch(currentUserActions.setCurrentUserInfo({...userData}));
          globalNavigate(ROUTES.AccountStack, {screen: ROUTES.Account});
          showToast(ToastTypes.Success, 'User info was successfully updated!');
        } catch (e) {
          showToast(
            ToastTypes.Error,
            'Something went wrong during user update',
          );
        }
      },
    }),
  }),
});
