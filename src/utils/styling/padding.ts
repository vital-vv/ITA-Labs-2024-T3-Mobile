import {StyleSheet} from 'react-native';

export const setPadding = (pt: number, pr: number, pb: number, pl: number) => {
  const styles = StyleSheet.create({
    padding: {
      paddingTop: pt,
      paddingRight: pr,
      paddingBottom: pb,
      paddingLeft: pl,
    },
  });
  return styles.padding;
};
