import {Platform, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {textTypographyStyles} from '../../../../styles/textTypographyStyles';
import {TEXT_VARIANT} from '../../../../types/textVariant';

export const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 16,
    height: 50,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: Colors.TERTIARY,
    borderRadius: 12,
    padding: 12,
    shadowColor: Colors.BLACK,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  item: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderStyle: {
    ...textTypographyStyles[TEXT_VARIANT.MAIN_16_400],
  },
  selectedTextStyle: {
    ...textTypographyStyles[TEXT_VARIANT.MAIN_16_400],
  },
});
