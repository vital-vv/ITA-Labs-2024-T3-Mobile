import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';

const appDropDownInputStyles = StyleSheet.create({
  input: {
    borderColor: Colors.TERTIARY,
    borderRadius: 2,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 44,
    maxHeight: 44,
    color: Colors.PRIMARY,
  },
  placeholder: {
    color: Colors.SECONDARY,
  },
  dropdown: {
    maxHeight: 200,
    elevation: 24,
    borderRadius: 2,
    borderColor: Colors.WHITE,
    backgroundColor: Colors.WHITE,
    paddingVertical: 8,
    marginBottom: 8,
    marginTop: 4,
    zIndex: 5,
  },
  option: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 6,
    color: Colors.PRIMARY,
  },
});

export default appDropDownInputStyles;
