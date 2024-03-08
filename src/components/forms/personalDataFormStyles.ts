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
    photo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.WARNING,
        marginVertical: 24,
        alignSelf: 'center',
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
