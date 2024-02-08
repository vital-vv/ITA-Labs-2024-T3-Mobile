import {Children, ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {styles} from './mainWrapperStyles';

type Props = {
  children: ReactNode;
  
  style?: StyleProp<ViewStyle>;
};
export const MainWrapper = ({children, style}: Props) => (
  <View style={[styles.mainWrapper, style]}>{children}</View>
);
