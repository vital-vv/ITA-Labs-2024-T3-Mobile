import {StyleSheet} from 'react-native';
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
  downloading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloading_text: {
    marginTop: 15,
  },
});
