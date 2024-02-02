import {Image, Text, Pressable} from 'react-native';
import React from 'react';

import styles from './buttonWithIconStyle';

const ButtonWithIcon = (props: {
  title: string;
  type: 'light' | 'dark';
  image: object;
}) => {
  return (
    <Pressable style={props.type === 'light' ? styles.light : styles.dark}>
      <Image style={styles.image} source={props.image} />
      <Text
        style={props.type === 'light' ? styles.title_light : styles.title_dark}>
        {props.title}
      </Text>
    </Pressable>
  );
};

export default ButtonWithIcon;
