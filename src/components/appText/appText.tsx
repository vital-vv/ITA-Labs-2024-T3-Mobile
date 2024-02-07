import {FC} from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {TEXT_VARIANT} from '../../types/textVariant';
import {TEXT_COLOR_VARIANT} from '../../types/textColorVariant';
import {textTypographyStyles} from '../../styles/textTypographyStyles';
import {Colors} from '../../constants/colors';
import {textColorStyles} from '../../styles/textColorStyles';

export type AppTextProps = TextProps & {
  text: string | number;
  style?: TextStyle;
  children?: React.ReactNode;
  variant?: TEXT_VARIANT;
  color?: TEXT_COLOR_VARIANT;
};

export const AppText: FC<AppTextProps> = ({
  text,
  children,
  variant = TEXT_VARIANT.MAIN_18_400,
  color = Colors.PRIMARY,
  style,
}) => {
  if (
    (text === undefined || text === null) &&
    (children === undefined || children === null)
  )
    return null;
  return (
    <Text
      style={[textTypographyStyles[variant], textColorStyles[color], style]}>
      {text}
    </Text>
  );
};
