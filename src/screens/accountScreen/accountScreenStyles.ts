import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {Colors} from '../../constants/colors';

const screenWidth = Dimensions.get('window').width;

const accountScreenStyles = StyleSheet.create({
  group_container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopColor: Colors.HORIZONTAL_DIVIDER,
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  tab_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  add_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  without_photo: {
    height: 48,
    width: 48,
    borderRadius: 42,
    backgroundColor: Colors.WARNING,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  with_photo: {
    height: 48,
    width: 48,
    borderRadius: 42,
    marginRight: 16,
  },
  user_info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tab: {
    paddingVertical: 10,
  },
});

export default accountScreenStyles;
