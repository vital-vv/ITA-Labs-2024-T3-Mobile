import {ActivityIndicator, View} from 'react-native';
import {styles} from './spinnerWrapperStyles';
import {AppText} from '../appText/appText';
import {Colors} from '../../constants/colors';

type Props = {
  text?: string;
  size?: number | 'small' | 'large' | undefined;
  color?: Colors;
};
export const SpinnerWrapper = ({
  text = 'Loading...',
  size = 'large',
  color = Colors.SELECTED_TAB_NAV,
}: Props) => (
  <View style={[styles.wrapper]}>
    <AppText text={`${text}`} style={styles.text} />
    <ActivityIndicator color={color} size={size} />
  </View>
);
