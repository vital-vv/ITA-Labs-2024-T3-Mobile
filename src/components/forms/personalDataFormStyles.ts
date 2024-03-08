import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {Colors} from '../../constants/colors';

const screenWidth = Dimensions.get('window').width;

const PersonalDataFormStyles = StyleSheet.create({
    container: {
        borderTopColor: Colors.HORIZONTAL_DIVIDER,
        borderTopWidth: 1,
        paddingHorizontal: 16,
      },
    form_title: {
        borderBottomColor: Colors.HORIZONTAL_DIVIDER,
        borderBottomWidth: 1,
    },
    button: {
    },
    image_container: {
        position: 'relative',
        width: 80,
        height: 80,
        marginVertical: 24,
        alignSelf: 'center',
    },
    nophoto: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.WARNING,
        alignSelf: 'center',
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
    },
    photo_edit: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.WHITE,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Colors.TERTIARY,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    initials: {
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        columnGap: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PersonalDataFormStyles;
