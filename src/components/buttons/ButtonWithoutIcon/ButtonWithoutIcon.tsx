import {Pressable, StyleProp, View, ViewStyle} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {TEXT_VARIANT} from '../../../types/textVariant';
import {Colors} from '../../../constants/colors';
import {AppText} from '../../appText/appText';
import styles from './buttonWithoutIconStyles';

type Props = {
  title: string;
  type?: 'light' | 'dark';
  style?: StyleProp<ViewStyle>;
};

const ButtonWithoutIcon: FC<Props> = ({title, type = 'dark', style}) => {
  const wrapperStyle = type === 'light' ? styles.ligth : styles.dark;
  const textColor = type === 'light' ? Colors.BUTTON_PRIMARY : Colors.WHITE;
  return (
    <Pressable style={[styles.buttonWrapper, wrapperStyle, style]}>
      <AppText
        text={`${title}`}
        variant={TEXT_VARIANT.MAIN_18_500}
        color={textColor}
      />
    </Pressable>
  );
};

export default ButtonWithoutIcon;
