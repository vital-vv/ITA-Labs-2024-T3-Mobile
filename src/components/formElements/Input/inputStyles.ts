import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';

const inputStyles = StyleSheet.create({
  input: {
    borderColor: Colors.TERTIARY,
    borderRadius: 2,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 44,
    color: Colors.PRIMARY,
  },
});

export default inputStyles;
