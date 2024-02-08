import {Pressable, StyleProp, View, ViewStyle} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {TEXT_VARIANT} from '../../../types/textVariant';
import {Colors} from '../../../constants/colors';
import {AppText} from '../../appText/appText';
import styles from './buttonWithIconStyle';

type Props = {
  title: string;
  type?: 'light' | 'dark';
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ButtonWithIcon: FC<Props> = ({title, type = 'dark', icon, style}) => {
  const wrapperStyle = type === 'light' ? styles.ligth : styles.dark;
  const textColor = type === 'light' ? Colors.BUTTON_PRIMARY : Colors.WHITE;
  return (
    <Pressable style={[styles.buttonWrapper, wrapperStyle, style]}>
      {icon}
      <AppText
        text={`${title}`}
        variant={TEXT_VARIANT.MAIN_18_500}
        color={textColor}
      />
    </Pressable>
  );
};

export default ButtonWithIcon;
