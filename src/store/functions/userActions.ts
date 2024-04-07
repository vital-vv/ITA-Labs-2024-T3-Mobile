import {signOut} from 'aws-amplify/auth';
import {AppDispatch} from '..';
import {currentUserActions} from '../slices/currentUserSlice';
import {globalNavigate} from '../../navigation/globalNavigation';
import {ROUTES} from '../../constants/routes';
import {showToast} from '../../components/toasts';
import {ToastTypes} from '../../types/toasts';
import {amplifyAuthActions} from '../slices/amplifyAuthSlice.ts';
import {AuthStatuses} from '../../types/auth.ts';

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await signOut();
    dispatch(currentUserActions.isLogout());
    globalNavigate(ROUTES.HomeStack, {screen: ROUTES.Home});
    showToast(ToastTypes.Success, 'Logout was successful');
  } catch (e) {
    showToast(ToastTypes.Error, 'Something went wrong during logout');
  }
};

export const loginInAppFirstTime = () => async (dispatch: AppDispatch) => {
  dispatch(currentUserActions.setCurrentUserAsLogedInAndNotOnboarded());
  globalNavigate(ROUTES.OnBoarding);
};

export const navigateGuestToSignIn = () => async (dispatch: AppDispatch) => {
  dispatch(amplifyAuthActions.setTransitionState(true));
  globalNavigate(ROUTES.Auth);
  dispatch(amplifyAuthActions.setAuthState(AuthStatuses.SignIn));
};
export const navigateGuestToSignUp = () => async (dispatch: AppDispatch) => {
  dispatch(amplifyAuthActions.setTransitionState(true));
  globalNavigate(ROUTES.Auth);
  dispatch(amplifyAuthActions.setAuthState(AuthStatuses.SignUp));
};
