import {Platform, StyleSheet} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {Colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  sort__block: {
    ...setPadding(18, 0, 18, 0),
    paddingVertical: 18,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  sort__button: {
    flexGrow: 1,
    borderRadius: 20,
    alignItems: 'center',
    ...setPadding(2, 16, 2, 16),
    borderColor: Colors.SECONDARY,
    borderWidth: 1,
    backgroundColor: Colors.SORT_BTN_BACKGROUND,
  },

  filter: {
    backgroundColor: Colors.SELECTED_TAB_NAV,
    padding: 8,
    borderRadius: 20,
    position: 'absolute',
    bottom: 16,
    right: 16,
    shadowColor: Colors.BLACK,

    ...Platform.select({
      ios: {
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: 5,
          width: 5,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
