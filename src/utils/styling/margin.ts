import {StyleSheet} from 'react-native';

export const setMargin = (mt: number, mr: number, mb: number, ml: number) => {
  const styles = StyleSheet.create({
    margin: {
      marginTop: mt,
      marginRight: mr,
      marginBottom: mb,
      marginLeft: ml,
    },
  });
  return styles.margin;
};
