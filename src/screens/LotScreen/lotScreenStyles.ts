import {StyleSheet} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {Colors} from '../../constants/colors';
import {setMargin} from '../../utils/styling/margin';

export const styles = StyleSheet.create({
  image: {
    height: 288,
    width: '100%',
  },
  lotScreenWrapper: {
    backgroundColor: Colors.WHITE,
  },
  titleWrapper: {
    ...setMargin(8, 0, 0, 0),
    ...setPadding(0, 16, 0, 16),
  },
  dateInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...setMargin(8, 0, 0, 0),
  },
  price: {...setPadding(0, 16, 4, 16)},
  expiration: {
    backgroundColor: Colors.SYSTEM_EXTRALIGHT,
    ...setPadding(4, 8, 4, 8),
    borderRadius: 5,
  },
  mainInfoWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pricesWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(16, 0, 16, 0),
  },
  text: {
    flexShrink: 1,
    width: '50%',
    ...setPadding(8, 8, 16, 16),
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    columnGap: 8,
  },
});
