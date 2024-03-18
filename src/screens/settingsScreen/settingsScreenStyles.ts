import {Dimensions, StyleSheet} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const settingsScreenStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24,
  },
  text: {
    width: screenWidth - 68
  }
});

export default settingsScreenStyles;
