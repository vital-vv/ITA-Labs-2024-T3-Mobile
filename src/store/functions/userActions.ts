import {signOut} from 'aws-amplify/auth';
import {AppDispatch} from '..';
import {currentUserActions} from '../slices/currentUserSlice';
import {globalNavigate} from '../../navigation/globalNavigation';
import {ROUTES} from '../../constants/routes';
import {showToast} from '../../components/toasts';
import {ToastTypes} from '../../types/toasts';

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(currentUserActions.isLogout());
    globalNavigate(ROUTES.HomeStack, {screen: ROUTES.Home});
    await signOut();
    showToast(ToastTypes.Success, 'Logout was successful');
  } catch (e) {
    showToast(ToastTypes.Error, 'Something went wrong during logout');
  }
};

export const loginInAppFirstTime = () => async (dispatch: AppDispatch) => {
  dispatch(currentUserActions.setCurrentUserAsLogedInAndNotOnboarded());
  globalNavigate(ROUTES.OnBoarding);
};
