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
});

export default buttonWithIconStyle;
