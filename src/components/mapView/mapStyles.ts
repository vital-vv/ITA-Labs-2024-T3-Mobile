import {StyleSheet, Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  map: {
    height: deviceHeight * 0.3,
    width: deviceWidth,
  },
});
