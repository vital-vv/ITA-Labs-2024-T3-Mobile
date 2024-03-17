import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

const notificationStyles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.HORIZONTAL_DIVIDER,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    marginVertical: 16,
    marginLeft: 32,
    textAlign: 'left',
  },
  button: {
    minHeight: 32,
  },
  button_container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
});

export default notificationStyles;
