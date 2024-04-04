import {Dimensions, StyleSheet} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {setMargin} from '../../utils/styling/margin';
import {TEXT_VARIANT} from '../../types/textVariant';
import {textTypographyStyles} from '../../styles/textTypographyStyles';
import {textColorStyles} from '../../styles/textColorStyles';
import {Colors} from '../../constants/colors';

const deviceHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    ...setPadding(32, 16, 32, 16),
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
    minHeight: deviceHeight * 0.6,
  },
  forgotPassword: {
    alignSelf: 'center',
    ...setMargin(0, 0, 12, 0),
    ...textTypographyStyles[TEXT_VARIANT.MAIN_14_500],
    ...textColorStyles[Colors.BUTTON_PRIMARY],
  },
  passwordReq: {
    gap: 4,
  },
  formErrors: {
    height: 24,
    ...setMargin(0, 0, 12, 0),
    ...textTypographyStyles[TEXT_VARIANT.MAIN_10_500],
    ...textColorStyles[Colors.ERROR_BASE],
  },
});
