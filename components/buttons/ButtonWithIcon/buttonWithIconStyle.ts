import {StyleSheet} from 'react-native';

const buttonWithIconStyle = StyleSheet.create({
  light: {
    width: '100%',
    borderColor: 'rgba(56, 153, 155, 1)',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 40,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 2,
  },
  dark: {
    width: '100%',
    backgroundColor: 'rgba(56, 153, 155, 1)',
    borderColor: 'rgba(56, 153, 155, 1)',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 40,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 2,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  title_light: {
    color: 'rgba(56, 153, 155, 1)',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  title_dark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.3,
  },
});

export default buttonWithIconStyle;
