import {StyleSheet} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {Colors} from '../../constants/colors';

const betsScreenStyles = StyleSheet.create({
    button_wrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        width: '50%',
        alignItems: 'center',
        borderBottomColor: Colors.WHITE,
        borderBottomWidth: 2,
        borderStyle: 'solid',

    },
    button_pressed: {
        borderBottomColor: Colors.SELECTED_TAB_NAV,
        borderBottomWidth: 2,
        borderStyle: 'solid',
    },
    bets_list: {
        width: '100%',
        padding: 16,
    }
});

export default betsScreenStyles
