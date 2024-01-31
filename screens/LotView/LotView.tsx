import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';

  import data from '../../assets/mock-entities.json'

  import styles from './lotViewStyle'
  
  
  export const LotViewScreen = () => {

    return (
        <ScrollView style={styles.lot_view}>
            <Image style={styles.image} source={require('../../assets/images/apple_image.png')} />
            <View style={styles.lot_info}>
                <Text style={styles.title}>{data.lots[0].title}</Text>
                <View style={styles.sub_info}>
                    <Text style={styles.expDate}>{data.lots[0].expiration_date}</Text>
                    <Text style={styles.lot_id}>{data.lots[0].lot_id}</Text>
                </View>
                <View style={styles.price_info}>
                    <View style={styles.price_item}>
                        <Text style={[styles.price, styles.bet]}>${((data.lots[0].price_per_unit)*(data.lots[0].quantity)).toFixed(2)}</Text>
                        <Text style={styles.price_per_unit}>${data.lots[0].price_per_unit}</Text>
                    </View>
                    <View style={styles.price_item}>
                        <Text style={styles.price}>${((data.lots[0].price_per_unit)*(data.lots[0].quantity)).toFixed(2)}</Text>
                        <Text style={styles.price_per_unit}>${data.lots[0].price_per_unit}</Text>
                    </View>
                </View>
                <View style={styles.main_info}>
                    <View style={styles.main_info__block}>
                        <Text style={[styles.main_info__item, styles.main_info__specification]}>Variety</Text>
                        <Text style={styles.main_info__item}>{data.lots[0].variety}</Text>
                    </View>
                    <View style={styles.main_info__block}>
                        <Text style={[styles.main_info__item, styles.main_info__specification]}>Quantity</Text>
                        <Text style={styles.main_info__item}>{data.lots[0].quantity}</Text>
                    </View>
                    <View style={styles.main_info__block}>
                        <Text style={[styles.main_info__item, styles.main_info__specification]}>Size</Text>
                        <Text style={styles.main_info__item}>{data.lots[0].size}</Text>
                    </View>
                    <View style={styles.main_info__block}>
                        <Text style={[styles.main_info__item, styles.main_info__specification]}>Packaging</Text>
                        <Text style={styles.main_info__item}>{data.lots[0].packaging}</Text>
                    </View>
                    <View style={styles.main_info__block}>
                        <Text style={[styles.main_info__item, styles.main_info__specification]}>Location</Text>
                        <Text style={styles.main_info__item}>{data.lots[0].location.country},{data.lots[0].location.region}</Text>
                    </View>
                    <View style={styles.main_info__block}>
                        <Text style={[styles.main_info__item, styles.main_info__specification]}>Created</Text>
                        <Text style={styles.main_info__item}>{data.lots[0].created_at}</Text>
                    </View>
                </View>
            </View>
            <Text>Lotscreen</Text>
        </ScrollView>
    )
  }
  
  