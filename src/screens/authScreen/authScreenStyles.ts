import {StyleSheet} from 'react-native';
import {setPadding} from '../../utils/styling/padding';

export const styles = StyleSheet.create({
  button: {
    ...setPadding(20, 20, 30, 20),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
