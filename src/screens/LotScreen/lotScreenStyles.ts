import {StyleSheet} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {Colors} from '../../constants/colors';
import {setMargin} from '../../utils/styling/margin';

export const styles = StyleSheet.create({
  lotScreenWrapper: {
    backgroundColor: Colors.WHITE,
  },
  titleWrapper: {
    ...setMargin(8, 0, 0, 0),
    ...setPadding(0, 16, 0, 16),
  },
  buttons_wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    columnGap: 8,
  },
});
