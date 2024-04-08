import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  wrapper: {marginBottom: 12},
  dropdown: {
    height: 44,
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
    padding: 12,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  itemContainerStyle: {
    backgroundColor: Colors.SECONDARY,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.PRIMARY,
  },

  selectedTextStyle: {
    fontSize: 16,
    color: Colors.PRIMARY,
  },

  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    color: Colors.PRIMARY,
    marginRight: 5,
    fontSize: 16,
  },
});
