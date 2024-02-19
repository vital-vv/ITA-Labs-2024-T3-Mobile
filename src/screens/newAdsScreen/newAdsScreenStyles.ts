import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {Colors} from '../../constants/colors';

const screenWidth = Dimensions.get('window').width;

const formCreateLotStyles = StyleSheet.create({
  container: {
    borderTopColor: Colors.HORIZONTAL_DIVIDER,
    borderTopWidth: 1,
    paddingHorizontal: 16,
  },
  form_title: {
    marginBottom: 8,
  },
  form_description: {
    marginBottom: 16,
  },
  form_select: {
    marginBottom: 16,
    borderColor: Colors.TERTIARY,
    borderRadius: 2,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 44,
  },
  form_disabled: {
    backgroundColor: Colors.SORT_BTN_BACKGROUND,
    borderColor: Colors.BTN_BORDER,
  },
  select_measure: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 6,
  },
  measure_input: {
    width: screenWidth - 136,
  },
  measure_select: {
    width: 96,
  },
  send_block: {
    paddingTop: 16,
    borderTopColor: Colors.HORIZONTAL_DIVIDER,
    borderTopWidth: 1,
  },
  preview_button: {
    marginBottom: 16,
  },
  preview_button_small: {
    maxHeight: 44,
  },
  success_button: {
    maxHeight: 48,
    position: 'absolute',
    bottom: 0,
    left: 16,
    width: screenWidth - 32,
  },
  preview_button_text: {
    textAlign: 'center',
  },
  submit_button_disabled: {
    borderColor: Colors.HORIZONTAL_DIVIDER,
    paddingVertical: 10,
    backgroundColor: Colors.HORIZONTAL_DIVIDER,
    borderRadius: 2,
    marginBottom: 24,
  },
  submit_button_text: {
    textAlign: 'center',
  },
  preview_nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  success_image: {
    marginTop: 112,
    marginBottom: 85.75,
    alignSelf: 'center',
  },
  modal_mainwrapper: {
    position: 'relative',
  },
});

export default formCreateLotStyles;
