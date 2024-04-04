import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  lotScreenWrapper: {
    backgroundColor: Colors.WHITE,
  },
  buttons_wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    columnGap: 8,
  },
  block: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
