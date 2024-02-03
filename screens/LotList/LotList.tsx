import {
  Text,
  Pressable,
  View,
  ActivityIndicator,
  RefreshControl,
  Alert,
  FlatList,
} from 'react-native';

import ListItem from '../../components/ListItem';
import styles from './lotListStyles';
import React, {useState, useEffect} from 'react';

type LotType = {
  lot_id: number;
  title: string;
  product_type: string;
  product_subtype: string;
  quantity: number;
  price_per_unit: number;
  location: {
    country: string;
    region: string;
  };
  description: string;
  status: string;
  image_url: string;
  expiration_date: string;
  variety: string;
  size: string;
  packaging: string;
  created_at: string;
};

type SubtypeProps = {
  product_subtype: string;
};

const LotList = (props: SubtypeProps) => {
  const [isLoading, setLoading] = useState(true);
  const [lotList, setLotList] = useState<LotType[]>([]);

  const filter: string = props.product_subtype;
  const url: string =
    'https://65bb963e52189914b5bc9435.mockapi.io/mock-entities/lots' +
    `?product_subtype=${filter}`;

  const getLotList = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setLotList(data);
    } catch (error) {
      Alert.alert('Error', 'Sorry, Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLotList();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.downloading}>
        <ActivityIndicator size={'large'} />
        <Text style={styles.downloading_text}>Downloading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.sort__block}>
        <Pressable style={styles.sort__button}>
          <Text>Popular lots</Text>
        </Pressable>
        <Pressable style={styles.sort__button}>
          <Text>Best price</Text>
        </Pressable>
        <Pressable style={styles.sort__button}>
          <Text>New lots</Text>
        </Pressable>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getLotList} />
        }
        data={lotList}
        renderItem={({item}) => <ListItem lot={item} />}
      />
    </View>
  );
};

export default LotList;
