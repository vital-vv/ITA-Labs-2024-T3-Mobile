import {StyleSheet} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {Colors} from '../../constants/colors';
import {setMargin} from '../../utils/styling/margin';

const BetViewScreenStyles = StyleSheet.create({
  lotScreenWrapper: {
    backgroundColor: Colors.WHITE,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    columnGap: 8,
  },
});

export default BetViewScreenStyles
