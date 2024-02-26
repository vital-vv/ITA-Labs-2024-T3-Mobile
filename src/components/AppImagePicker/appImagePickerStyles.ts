import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

const appImagePickerStyles = StyleSheet.create({
    image_block:{
        width: 120,
        height: 100,
        borderRadius: 4,
        borderColor: Colors.SELECTED_TAB_NAV,
        borderWidth: 2,
        borderStyle: 'solid',
        backgroundColor: Colors.SORT_BTN_BACKGROUND,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      imageStyle: {
        width: 120,
        height: 100,
        borderRadius: 4,
      },
});

export default appImagePickerStyles;
