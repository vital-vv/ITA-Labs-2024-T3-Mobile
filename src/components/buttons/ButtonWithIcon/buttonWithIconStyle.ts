import {StyleSheet} from 'react-native';
import {setPadding} from '../../../utils/styling/padding';
import {Colors} from '../../../constants/colors';

const buttonWithIconStyle = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    ...setPadding(8, 0, 8, 0),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderRadius: 3,
    minHeight: 44,
  },
  ligth: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BUTTON_PRIMARY,
  },
  dark: {
    backgroundColor: Colors.BUTTON_PRIMARY,
    borderColor: Colors.BUTTON_PRIMARY,
  },
});

export default buttonWithIconStyle;
