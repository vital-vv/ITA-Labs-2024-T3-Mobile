import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';

  import data from '../assets/mock-entities.json'
  
  
  export const LotScreen = () => {

    const styles = StyleSheet.create({
        lotScreen: {
            backgroundColor: '#FFF'
        },
        image: {
            height: 288,
            width: '100%'
        },
        lotInfo: {
            marginHorizontal: 16,
            marginVertical: 8
        },
        title: {
            fontSize: 20,
            fontWeight: '500',
            lineHeight: 28,
            letterSpacing: 0.15,
            paddingBottom: 8,
        },
        subInfo: {
            display: 'flex',
            flexDirection: 'row',
            columnGap: 6,
        },
        expDate: {
            backgroundColor: '#EEF7FF',
            borderRadius: 4,
            paddingHorizontal: 8,
            paddingVertical: 4,
            color: '#2978B8',
            fontSize: 10,
            fontWeight: '500',
            lineHeight: 12,
            letterSpacing: 0.2,
        },
        lotId: {
            paddingVertical: 4,
            color: '#798787',
            fontSize: 10,
            fontWeight: '500',
            lineHeight: 12,
            letterSpacing: 0.2,
        },
        priceInfo: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 16,
        },
        priceItem: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        },
        price: {
            color: '#131314',
            fontSize: 24,
            fontWeight: '500',
            lineHeight: 32,

        },
        bet: {
            color: '#F87E25'
        },
        pricePerUnit: {
            marginTop: 4,
            color: '#798787',
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 16,
            letterSpacing: 0.2,
        },
        mainInfo: {
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
        }
      });

    return (
        <ScrollView style={styles.lotScreen}>
            <Image style={styles.image} source={require('../assets/images/apple_image.png')} />
            <View style={styles.lotInfo}>
                <Text style={styles.title}>{data.lots[0].title}</Text>
                <View style={styles.subInfo}>
                    <Text style={styles.expDate}>{data.lots[0].expiration_date}</Text>
                    <Text style={styles.lotId}>{data.lots[0].lot_id}</Text>
                </View>
                <View style={styles.priceInfo}>
                    <View style={styles.priceItem}>
                        <Text style={[styles.price, styles.bet]}>${(data.lots[0].price_per_unit)*(data.lots[0].quantity)}</Text>
                        <Text style={styles.pricePerUnit}>${data.lots[0].price_per_unit}</Text>
                    </View>
                    <View style={styles.priceItem}>
                        <Text style={styles.price}>${(data.lots[0].price_per_unit)*(data.lots[0].quantity)}</Text>
                        <Text style={styles.pricePerUnit}>${data.lots[0].price_per_unit}</Text>
                    </View>
                </View>
                <View style={styles.mainInfo}>
                    <Text>Variety</Text>
                    <Text>{data.lots[0].variety}</Text>
                    <Text>Quantity</Text>
                    <Text>{data.lots[0].quantity}</Text>
                    <Text>Size</Text>
                    <Text>{data.lots[0].size}</Text>
                    <Text>Packaging</Text>
                    <Text>{data.lots[0].packaging}</Text>
                    <Text>Location</Text>
                    <Text>{data.lots[0].location.country},{data.lots[0].location.region}</Text>
                    <Text>Created</Text>
                    <Text>{data.lots[0].created_at}</Text>
                </View>
            </View>
            <Text>Lotscreen</Text>
        </ScrollView>
    )
  }
  
  