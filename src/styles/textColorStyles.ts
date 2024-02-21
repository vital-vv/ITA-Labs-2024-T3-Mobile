import {StyleSheet, TextStyle} from 'react-native';
import {TEXT_COLOR_VARIANT} from '../types/textColorVariant';
import {Colors} from '../constants/colors';

export const textColorStyles = StyleSheet.create<{
  [key in TEXT_COLOR_VARIANT]: TextStyle;
}>({
  [Colors.AGROEX_MAIN]: {
    color: Colors.AGROEX_MAIN,
  },
  [Colors.PRIMARY]: {
    color: Colors.PRIMARY,
  },
  [Colors.SECONDARY]: {
    color: Colors.SECONDARY,
  },
  [Colors.TERTIARY]: {
    color: Colors.TERTIARY,
  },
  [Colors.SYSTEM_BASE]: {
    color: Colors.SYSTEM_BASE,
  },
  [Colors.SYSTEM_DARK]: {
    color: Colors.SYSTEM_DARK,
  },
  [Colors.WARNING]: {
    color: Colors.WARNING,
  },
  [Colors.WHITE]: {
    color: Colors.WHITE,
  },
  [Colors.BUTTON_PRIMARY]: {
    color: Colors.BUTTON_PRIMARY,
  },
  [Colors.ERROR_BASE]: {
    color: Colors.ERROR_BASE,
  },
  [Colors.ERROR_BACKGROUND]: {
    color: Colors.ERROR_BACKGROUND,
  },
  [Colors.ERROR_DARK]: {
    color: Colors.ERROR_DARK,
  },
});
