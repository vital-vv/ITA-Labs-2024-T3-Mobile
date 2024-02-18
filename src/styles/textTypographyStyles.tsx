import {StyleSheet, TextStyle} from 'react-native';
import {TEXT_VARIANT} from '../types/textVariant';

export const textTypographyStyles = StyleSheet.create<{
  [key in TEXT_VARIANT]: TextStyle;
}>({
  [TEXT_VARIANT.MAIN_10_400]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 10,
  },
  [TEXT_VARIANT.MAIN_10_500]: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 10,
  },
  [TEXT_VARIANT.MAIN_12_400]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 12,
  },
  [TEXT_VARIANT.MAIN_16_400]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 16,
  },
  [TEXT_VARIANT.MAIN_16_500]: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
  },
  [TEXT_VARIANT.MAIN_18_400]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 18,
  },
  [TEXT_VARIANT.MAIN_18_500]: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 18,
  },
  [TEXT_VARIANT.MAIN_20_500]: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 20,
  },
  [TEXT_VARIANT.MAIN_24_400]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 24,
  },
  [TEXT_VARIANT.MAIN_24_500]: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 24,
  },
});
