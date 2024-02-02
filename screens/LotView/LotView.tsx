import {
  Image,
  ScrollView,
  Alert,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import styles from './lotViewStyle';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon';
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

const LotViewScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [lot, setLot] = useState<LotType[]>([]);

  const getLot = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://65bb963e52189914b5bc9435.mockapi.io/mock-entities/lot_1',
      );
      const data = await res.json();
      setLot(data);
    } catch (error) {
      Alert.alert('Error', 'Sorry, Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLot();
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
    <ScrollView
      style={styles.lot_view}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={getLot} />
      }>
      <Image
        style={styles.image}
        source={require('../../assets/images/apple_image.png')}
      />
      <View style={styles.lot_info}>
        <Text style={styles.title}>{lot[0].title}</Text>
        <View style={styles.sub_info}>
          <Text style={styles.expDate}>{lot[0].expiration_date}</Text>
          <Text style={styles.lot_id}>{lot[0].lot_id}</Text>
        </View>
        <View style={styles.price_info}>
          <View style={styles.price_item}>
            <Text style={[styles.price, styles.bet]}>
              ${(lot[0].price_per_unit * lot[0].quantity).toFixed(2)}
            </Text>
            <Text style={styles.price_per_unit}>${lot[0].price_per_unit}</Text>
          </View>
          <View style={styles.price_item}>
            <Text style={styles.price}>
              ${(lot[0].price_per_unit * lot[0].quantity).toFixed(2)}
            </Text>
            <Text style={styles.price_per_unit}>${lot[0].price_per_unit}</Text>
          </View>
        </View>
        <View style={styles.main_info}>
          <View style={styles.main_info__block}>
            <Text
              style={[styles.main_info__item, styles.main_info__specification]}>
              Variety
            </Text>
            <Text style={styles.main_info__item}>{lot[0].variety}</Text>
          </View>
          <View style={styles.main_info__block}>
            <Text
              style={[styles.main_info__item, styles.main_info__specification]}>
              Quantity
            </Text>
            <Text style={styles.main_info__item}>{lot[0].quantity}</Text>
          </View>
          <View style={styles.main_info__block}>
            <Text
              style={[styles.main_info__item, styles.main_info__specification]}>
              Size
            </Text>
            <Text style={styles.main_info__item}>{lot[0].size}</Text>
          </View>
          <View style={styles.main_info__block}>
            <Text
              style={[styles.main_info__item, styles.main_info__specification]}>
              Packaging
            </Text>
            <Text style={styles.main_info__item}>{lot[0].packaging}</Text>
          </View>
          <View style={styles.main_info__block}>
            <Text
              style={[styles.main_info__item, styles.main_info__specification]}>
              Location
            </Text>
            <Text style={styles.main_info__item}>
              {lot[0].location.country},{lot[0].location.region}
            </Text>
          </View>
          <View style={styles.main_info__block}>
            <Text
              style={[styles.main_info__item, styles.main_info__specification]}>
              Created
            </Text>
            <Text style={styles.main_info__item}>{lot[0].created_at}</Text>
          </View>
        </View>
      </View>
      <View style={styles.button_block}>
        <View style={styles.button_block_item}>
          <ButtonWithIcon
            title="Place a bet"
            type="light"
            image={require('../../assets/images/Bet.png')}
          />
        </View>
        <View style={styles.button_block_item}>
          <ButtonWithIcon
            title="Buy now"
            type="dark"
            image={require('../../assets/images/Buy.png')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LotViewScreen;
