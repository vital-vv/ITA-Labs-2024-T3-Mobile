import {Dimensions, StyleSheet} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {Colors} from '../../constants/colors';
import {setMargin} from '../../utils/styling/margin';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  lotScreenWrapper: {
    backgroundColor: Colors.WHITE,
  },
  titleWrapper: {
    ...setMargin(8, 0, 16, 0),
    ...setPadding(0, 16, 0, 16),
  },
  buttons_wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    columnGap: 8,
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
