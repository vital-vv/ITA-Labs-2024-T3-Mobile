import Toast from 'react-native-toast-message';
import {ToastTypes} from '../../types/toasts';

export const showToast = (type: ToastTypes, message?: string) => {
  const text1 = type === ToastTypes.Success ? 'Success' : 'Error';
  const defaultText2 =
    text1 === 'Success'
      ? 'Operation was successful!'
      : 'Sorry, something went wrong';
  Toast.show({
    type: `${type}`,
    text1: type === ToastTypes.Success ? 'Success' : 'Error',
    text2: message ?? defaultText2,
    position: 'top',
    bottomOffset: 40,
    topOffset: 60,
    visibilityTime: 2000,
  });
};
