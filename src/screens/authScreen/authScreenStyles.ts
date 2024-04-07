import {StyleSheet} from 'react-native';
import {setPadding} from '../../utils/styling/padding';
import {Colors} from '../../constants/colors';
import {Dimensions} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  button: {
    ...setPadding(20, 20, 30, 20),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  loading: {
    height: deviceHeight,
    width: deviceWidth,
    position: 'absolute',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
