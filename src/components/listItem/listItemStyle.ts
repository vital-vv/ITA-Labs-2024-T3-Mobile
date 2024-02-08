import {StyleSheet} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {Colors} from '../../constants/colors';
import {setMargin} from '../../utils/styling/margin';

export const styles = StyleSheet.create({
  item: {
    ...setPadding(16, 0, 16, 0),
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  image: {
    width: 120,
    height: 120,
  },
  lot_info: {
    display: 'flex',
    flexDirection: 'column',
  },
  lot_block: {
    ...setMargin(4, 0, 0, 0),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expiration: {
    backgroundColor: Colors.SYSTEM_EXTRALIGHT,
    ...setPadding(4, 8, 4, 8),
    borderRadius: 5,
  },
});
