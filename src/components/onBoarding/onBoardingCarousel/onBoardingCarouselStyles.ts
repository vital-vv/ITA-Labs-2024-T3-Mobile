import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  itemsWrapper: {
    paddingHorizontal: 16,
    flex: 1,
  },
  item: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.9,
    gap: Dimensions.get('window').height * 0.1,
  },
  form: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.9,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.4,
    resizeMode: 'cover',
  },
  title: {textAlign: 'center'},
  text: {textAlign: 'center', marginTop: 5},
  navBar: {
    height: Dimensions.get('window').height * 0.1,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  skipText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
  },
});
