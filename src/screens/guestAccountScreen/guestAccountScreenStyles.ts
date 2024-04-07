import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {textTypographyStyles} from '../../styles/textTypographyStyles';
import { setPadding } from '../../utils/styling/padding';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  signUpButton: {
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUp: {
    ...setPadding(5,5,5,5)
  },
  signUpText: {
    textAlign: 'center',
    color: Colors.BUTTON_PRIMARY,
    ...textTypographyStyles.MAIN_14_500,
  },
});
