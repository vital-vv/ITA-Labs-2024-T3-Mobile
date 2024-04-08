import {Platform, StyleSheet} from 'react-native';
import {textTypographyStyles} from '../../styles/textTypographyStyles';
import {TEXT_VARIANT} from '../../types/textVariant';
import {setPadding} from '../../utils/styling/padding';
import {setMargin} from '../../utils/styling/margin';
import {device} from '../../utils/styling/dimensions';
import {Colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  mainWrapper: {
    ...setPadding(16, 16, 16, 16),
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },

  button: {
    width: device.width / 2 - 32,
    ...setMargin(16, 0, 0, 0),
  },

  input: {
    width: device.width / 2 - 32,
  },

  text:{marginBottom:3},
  dropdown: {
    marginBottom: 16,
    height: 44,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: Colors.TERTIARY,
    borderRadius: 6,
    padding: 12,
    shadowColor: Colors.SECONDARY,
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
  itemTextStyle: {
    color: Colors.PRIMARY,
  },
  placeholderStyle: {
    ...textTypographyStyles[TEXT_VARIANT.MAIN_16_400],
    color: Colors.PRIMARY,
  },
  selectedTextStyle: {
    ...textTypographyStyles[TEXT_VARIANT.MAIN_16_400],
    color: Colors.PRIMARY,
  },
});
