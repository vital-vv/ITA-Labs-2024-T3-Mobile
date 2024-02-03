import {StyleSheet} from 'react-native';

const listItemStyles = StyleSheet.create({
  box: {
    paddingHorizontal: 16,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 16,
  },
  lot_info: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: 4,
    color: '#131314',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  lot_block: {
    display: 'flex',
    flexDirection: 'row',
  },
  expiration: {
    backgroundColor: '#EEF7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#2978B8',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.2,
    lineHeight: 12,
  },
  id: {
    paddingVertical: 4,
    paddingLeft: 6,
    color: '#798787',
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 0.2,
    lineHeight: 12,
  },
  bets: {
    color: '#BCC3C3',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.15,
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 4,
  },
  price: {
    color: '#131314',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.15,
    lineHeight: 24,
    marginBottom: 4,
  },
  price_per_unit: {
    color: '#798787',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.2,
    lineHeight: 12,
    paddingBottom: 4,
    paddingTop: 8,
    marginLeft: 8,
  },
});

export default listItemStyles;
