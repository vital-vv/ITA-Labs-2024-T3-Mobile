import * as yup from 'yup';
import {passwordFormErrorMessages} from '../../../constants/errorMessages';
import {regExp} from '../../../utils/regularExpessions/regExp';

export enum FormValues {
  currentPassword = 'currentPassword',
  newPassword = 'newPassword',
  confirmPassword = 'confirmPassword',
}

export const formInitialValues = {
  [FormValues.currentPassword]: '',
  [FormValues.newPassword]: '',
  [FormValues.confirmPassword]: '',
};

export const passwordReviewSchema = yup.object({
  currentPassword: yup
    .string()
    .required(passwordFormErrorMessages.required)
    .matches(regExp.cognitoPassword, passwordFormErrorMessages.regExpMissmatch),
  newPassword: yup
    .string()
    .required(passwordFormErrorMessages.required)
    .matches(regExp.cognitoPassword, passwordFormErrorMessages.regExpMissmatch),
  confirmPassword: yup
    .string()
    .required(passwordFormErrorMessages.required)
    .oneOf(
      [yup.ref(FormValues.newPassword)],
      passwordFormErrorMessages.confirmPasswordMissmatch,
    ),
});
