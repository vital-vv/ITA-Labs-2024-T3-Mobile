import {StyleSheet, Dimensions} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {Colors} from '../../constants/colors';
import {setMargin} from '../../utils/styling/margin';
const screenWidth = Dimensions.get('window').width;

const myAdsItemStyles = StyleSheet.create({
  item: {
    ...setPadding(16, 0, 16, 0),
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  image: {
    width: screenWidth - 32,
    height: 160,
  },
  lot_info: {
    display: 'flex',
    flexDirection: 'column',
  },
  lot_block: {
    ...setMargin(8, 0, 0, 0),
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
  bets_block: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexShrink: 1,
    width: '50%',
    gap: 8,
  },
  pricesWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(16, 0, 0, 0),
  },
  price: {
    ...setPadding(0, 16, 4, 16),
  },
  text: {
    flexShrink: 1,
    width: '50%',
    ...setPadding(8, 8, 16, 16),
  },
  buttons_wrapper: {
    flexDirection: 'row',
    columnGap: 8,
  },
  on_moderation: {
    borderColor: Colors.SYSTEM_BASE,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: Colors.SYSTEM_EXTRALIGHT,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  rejected: {
    borderColor: Colors.ERROR_BASE,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: Colors.ERROR_BACKGROUND,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  moderator_description: {
    borderColor: Colors.ERROR_BASE,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: Colors.ERROR_BACKGROUND,
    padding: 20,
    ...setMargin(16, 0, 0, 0),
  },
});

export default myAdsItemStyles;
