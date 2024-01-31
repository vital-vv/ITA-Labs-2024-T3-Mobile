import { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import info from '../../assets/mock-entities.json'
import ListItem from '../../components/ListItem'
import styles from './lotListStyles'


function LotList(props: any): React.JSX.Element {

  const filter=props.product_subtype;


  function filterInfo (data: any) {
    const filteredInfo = [];
    for (const item of data) {
      if (item.product_subtype === filter ) {
        filteredInfo.push(item);
      }
      console.log(filteredInfo)
    }

    return filteredInfo
  }

  const lotsA=filterInfo(info.lots)

  const lots = lotsA.map(lot => {
    return (
      <ListItem 
          key={lot.lot_id}
          lot={lot}
          />       
        )
  })

  return (
    <View>
      <View style={styles.sort__block}>
        <TouchableOpacity style={styles.sort__button}>
          <Text>
            Popular lots
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sort__button}>
          <Text>
            Best price
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sort__button}>
          <Text>
            New lots
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {lots}
      </View>
    </View>
  );
}

export default LotList;
