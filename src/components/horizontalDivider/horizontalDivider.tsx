import {StyleSheet, View} from 'react-native';
import { Colors } from '../../constants/colors';

type Props = {width?: number};

export const HorizontalDivider = ({width = 100}: Props) => {
  const styles = StyleSheet.create({
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.HORIZONTAL_DIVIDER,
      width: `${width}%`,
      alignSelf: 'center',
    },
  });

  return <View style={styles.divider}></View>;
};
