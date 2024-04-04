import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

const DeliveryViewScreenStyles = StyleSheet.create({
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

export default DeliveryViewScreenStyles
