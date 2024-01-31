import { useState } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './listItemStyle'


function ListItem(props:any): React.JSX.Element {

  return (
    <TouchableOpacity style={styles.box}>
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={require('../assets/images/apple_image.png')} // fix when actual pictures will be available
        />
        <View style={styles.lot_info}>
            <Text style={styles.title}>{props.lot.title}</Text>
            <View style={styles.lot_block}>
              <Text style={styles.expiration}>{props.lot.expiration_date}</Text>
              <Text style={styles.id}>{props.lot.lot_id}</Text>
            </View>
            <Text style={styles.bets}>No bets</Text> 
            <View style={styles.lot_block}>
              <Text style={styles.price}>${((props.lot.quantity)*(props.lot.price_per_unit)).toFixed(2)}</Text>
              <Text style={styles.price_per_unit}>${props.lot.price_per_unit}/kg</Text>
            </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ListItem;
