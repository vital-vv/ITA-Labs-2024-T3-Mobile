import {StyleSheet} from 'react-native';
import {textTypographyStyles} from '../../styles/textTypographyStyles';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  text1Style: {
    ...textTypographyStyles[TEXT_VARIANT.MAIN_16_400],
    color: Colors.PRIMARY,
    fontWeight: '700',
    textAlign: 'left',
  },
  text2Style: {
    ...textTypographyStyles[TEXT_VARIANT.MAIN_16_400],
    color: Colors.SECONDARY,
    fontWeight: '700',
    textAlign: 'left',
  },
  successStyle: {
    borderLeftColor: Colors.BUTTON_PRIMARY,
    borderLeftWidth: 10,
  },
  errorStyle: {
    borderLeftColor: Colors.ERROR_DARK,
    borderLeftWidth: 10,
  },
  warningsStyle: {
    borderLeftColor: Colors.WARNING,
    borderLeftWidth: 10,
  },
});
