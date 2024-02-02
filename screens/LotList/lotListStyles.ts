import {StyleSheet} from 'react-native';

const lotListStyles = StyleSheet.create({
  sort__block: {
    paddingHorizontal: 11,
    paddingVertical: 18,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 16,
  },
  sort__button: {
    flexGrow: 1,
    marginHorizontal: 5,
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderColor: '#798787',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#F2F5F5',
    borderRadius: 20,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.15,
    lineHeight: 24,
    color: '#131314',
  },
  downloading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloading_text: {
    marginTop: 15,
  },
});

export default lotListStyles;
