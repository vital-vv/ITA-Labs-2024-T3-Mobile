import {BaseToast, ToastProps} from 'react-native-toast-message';
import {styles} from './toastConfigStyles';

export const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      contentContainerStyle={{paddingHorizontal: '10%'}}
      style={styles.successStyle}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  ),
  error: (props: ToastProps) => (
    <BaseToast
      {...props}
      contentContainerStyle={{paddingHorizontal: '10%'}}
      style={styles.errorStyle}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  ),
  warning: (props: ToastProps) => (
    <BaseToast
      {...props}
      contentContainerStyle={{paddingHorizontal: '10%'}}
      style={styles.errorStyle}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  ),
};
