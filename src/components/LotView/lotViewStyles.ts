import {StyleSheet, Dimensions} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {Colors} from '../../constants/colors';
import {setMargin} from '../../utils/styling/margin';
const screenWidth = Dimensions.get('window').width;
const LotViewStyles = StyleSheet.create({
  image: {
    height: 288,
    width: '100%',
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
  bets_block: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexShrink: 1,
    width: '50%',
    gap: 8,
  },
  discriptionWrapper: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.SECONDARY,
    backgroundColor: Colors.SORT_BTN_BACKGROUND,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  discriptionText: {
    width: screenWidth - 32 - 40 - 24 - 8,
  },
});

export default LotViewStyles;
