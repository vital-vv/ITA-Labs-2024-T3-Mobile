import {StyleSheet} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {Colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  counterWrapper: {
    display: 'flex',
    flexDirection: 'row',
    ...setPadding(4, 8, 4, 8),
    borderRadius: 5,
    gap: 5,
  },
  valid: {
    backgroundColor: Colors.SYSTEM_EXTRALIGHT,
  },
  expired: {
    backgroundColor: Colors.ERROR_BACKGROUND,
  },
});
