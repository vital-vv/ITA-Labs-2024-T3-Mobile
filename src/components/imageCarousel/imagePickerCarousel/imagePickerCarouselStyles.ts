import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';
import {Dimensions} from 'react-native';

const imagePickerCarouselStyles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.3,
        resizeMode: 'cover',
      },
      buttonsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        width: Dimensions.get('window').width - 32,
        top: '50%',
        // paddingHorizontal: 16,
        justifyContent: 'space-between',
      },
      buttons: {
        backgroundColor: Colors.CAROUSEL_BTN_BACKGROUND,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      gap: {
        width: 8, 
        height: 100,
        backgroundColor: Colors.WHITE
      }
});

export default imagePickerCarouselStyles;
