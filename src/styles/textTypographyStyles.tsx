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
    fontWeight: '700',
  },
  [TEXT_VARIANT.MAIN_12_400]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  [TEXT_VARIANT.MAIN_14_400]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  [TEXT_VARIANT.MAIN_14_500]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
  },
  [TEXT_VARIANT.MAIN_16_400]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  [TEXT_VARIANT.MAIN_16_500]: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  [TEXT_VARIANT.MAIN_18_400]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0.4,
  },
  [TEXT_VARIANT.MAIN_18_500]: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0.4,
  },
  [TEXT_VARIANT.MAIN_20_500]: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
  },
  [TEXT_VARIANT.MAIN_24_400]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 24,
  },
  [TEXT_VARIANT.MAIN_24_500]: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 24,
  },
  [TEXT_VARIANT.MAIN_30_800]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 32,
    fontWeight: '900',
  },
  [TEXT_VARIANT.MAIN_32_400]: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 32,
  },
});
