import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';

export const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    resizeMode: 'cover',
  },
  imageNotFound: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: Colors.SORT_BTN_BACKGROUND,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: Dimensions.get('window').width,
    top: '50%',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  buttons: {
    backgroundColor: Colors.CAROUSEL_BTN_BACKGROUND,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
