import {Pressable, StyleProp, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {TEXT_VARIANT} from '../../../types/textVariant';
import {Colors} from '../../../constants/colors';
import {AppText} from '../../appText/appText';
import styles from './buttonWithoutIconStyles';

type Props = {
  title: string;
  type?: 'light' | 'dark';
  style?: StyleProp<ViewStyle>;
  variant?: TEXT_VARIANT;
  onPress?: () => void;
  disabled?: boolean;
};

const ButtonWithoutIcon: FC<Props> = ({
  title,
  type = 'dark',
  style,
  variant = TEXT_VARIANT.MAIN_18_400,
  onPress,
  disabled = false,
}) => {
  const wrapperStyle = disabled === true ? styles.disabled : type === 'light' ? styles.ligth : styles.dark;
  const textColor = disabled === true ? Colors.TERTIARY : type === 'light' ? Colors.BUTTON_PRIMARY : Colors.WHITE;
  return (
    <Pressable
      style={[styles.buttonWrapper, wrapperStyle, style]}
      onPress={() => (onPress ? onPress() : null)}
      disabled={disabled}>
      <AppText text={`${title}`} variant={variant} color={textColor} />
    </Pressable>
  );
};

export default ButtonWithoutIcon;
