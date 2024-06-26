import {StyleSheet} from 'react-native';
import {setPadding} from '../../../utils/styling/padding';
import {Colors} from '../../../constants/colors';

const buttonWithIconStyle = StyleSheet.create({
  buttonWrapper: {
    ...setPadding(10, 0, 10, 0),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderRadius: 3,
  },
  ligth: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BUTTON_PRIMARY,
  },
  dark: {
    backgroundColor: Colors.BUTTON_PRIMARY,
    borderColor: Colors.BUTTON_PRIMARY,
  },
  disabled: {
    backgroundColor: Colors.HORIZONTAL_DIVIDER,
    borderColor: Colors.HORIZONTAL_DIVIDER,
  }
});

export default buttonWithIconStyle;
