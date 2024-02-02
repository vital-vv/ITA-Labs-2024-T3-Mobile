import {StyleSheet} from 'react-native';

const lotViewStyle = StyleSheet.create({
  lot_view: {
    backgroundColor: '#FFF',
  },
  image: {
    height: 288,
    width: '100%',
  },
  lot_info: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: 0.15,
    paddingBottom: 8,
    color: '#131314',
  },
  sub_info: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 6,
  },
  expDate: {
    backgroundColor: '#EEF7FF',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#2978B8',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 12,
    letterSpacing: 0.2,
  },
  lot_id: {
    paddingVertical: 4,
    color: '#798787',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 12,
    letterSpacing: 0.2,
  },
  price_info: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 16,
  },
  price_item: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  price: {
    color: '#131314',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
  },
  bet: {
    color: '#F87E25',
  },
  price_per_unit: {
    marginTop: 4,
    color: '#798787',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  main_info: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  main_info__block: {
    display: 'flex',
    flexDirection: 'row',
  },
  main_info__item: {
    flex: 1,
    paddingVertical: 8,
    color: '#131314',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  main_info__specification: {
    color: '#798787',
  },
  button_block: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    columnGap: 8,
  },
  button_block_item: {
    flex: 1,
  },
  map: {
    height: 221,
    width: '100%',
  },
  downloading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloading_text: {
    marginTop: 15,
  },
});

export default lotViewStyle;
