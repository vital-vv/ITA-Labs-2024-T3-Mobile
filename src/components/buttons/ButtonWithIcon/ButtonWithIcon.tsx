import {Pressable, StyleProp, ViewStyle} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {TEXT_VARIANT} from '../../../types/textVariant';
import {Colors} from '../../../constants/colors';
import {AppText} from '../../appText/appText';
import styles from './buttonWithIconStyle';

type Props = {
  title: string;
  type?: 'light' | 'dark' | 'success';
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: TEXT_VARIANT;
  onPress?: () => void;
  disabled?: boolean;
};

const ButtonWithIcon: FC<Props> = ({
  title,
  type = 'dark',
  icon,
  style,
  variant = TEXT_VARIANT.MAIN_18_400,
  onPress,
  disabled = false,
}) => {
  const wrapperStyle =  
  disabled === true
    ? styles.disabled
    : type === 'light' 
    ? styles.ligth 
    : type === 'success' 
    ? styles.success
    : styles.dark;
  const textColor =  
  disabled === true
    ? Colors.TERTIARY
    : type === 'light' 
    ? Colors.BUTTON_PRIMARY 
    : Colors.WHITE;
  return (
    <Pressable
      style={[styles.buttonWrapper, wrapperStyle, style]}
      onPress={() => (onPress ? onPress() : null)}
      disabled={disabled}>
      {icon}
      <AppText text={`${title}`} variant={variant} color={textColor} />
    </Pressable>
  );
};

export default ButtonWithIcon;
