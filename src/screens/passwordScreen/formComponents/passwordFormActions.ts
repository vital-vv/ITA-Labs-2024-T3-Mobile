import {FormikState} from 'formik';
import {FormValues, formInitialValues} from './formParams';
import {signOut, updatePassword} from 'aws-amplify/auth';
import {ROUTES} from '../../../constants/routes';
import {globalNavigate} from '../../../navigation/globalNavigation';
import {showToast} from '../../../components/toasts';
import {ToastTypes} from '../../../types/toasts';
import {GestureResponderEvent} from 'react-native';

type ResetForm = {
  resetForm: (
    nextState?: Partial<FormikState<typeof formInitialValues>> | undefined,
  ) => void;
};

export const updateUserPassword = async (
  values: typeof formInitialValues,
  {resetForm}: ResetForm,
) => {
  try {
    await updatePassword({
      oldPassword: values[FormValues.currentPassword],
      newPassword: values[FormValues.confirmPassword],
    });
    globalNavigate(ROUTES.AccountStack, {screen: ROUTES.Account});
    showToast(ToastTypes.Success, 'Password successfully updated');
  } catch (err) {
    globalNavigate(ROUTES.AccountStack, {screen: ROUTES.Account});
    showToast(
      ToastTypes.Error,
      'Something went wrong during password updating',
    );
  } finally {
    resetForm();
  }
};

export const forgotPasswordHandler = async (event: GestureResponderEvent) => {
  try {
    await signOut();
    globalNavigate(ROUTES.Auth);
  } catch {
    showToast(ToastTypes.Error, 'Something went wrong');
  }
};
