import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';
import {DeliveryStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {FC} from 'react';
import {useGetUserBoughtLotsQuery} from '../../api/endpoints';
import styles from './deliveryScreenStyles';
import {Pressable, RefreshControl, View} from 'react-native';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import {FlashList} from '@shopify/flash-list';
import {ListItem} from '../../components/listItem/ListItem';

type Props = NativeStackScreenProps<DeliveryStackParams, ROUTES.Delivery>;

export const DeliveryScreen: FC<Props> = ({navigation, route}) => {
  const {
    data: userBoughtData,
    isLoading,
    refetch: refetchUserBoughtData,
  } = useGetUserBoughtLotsQuery();

  return (
    <MainWrapper>
      <View style={styles.button_wrapper}>
        <View style={[styles.button, styles.button_pressed]}>
          <AppText
            text={'Completed'}
            variant={TEXT_VARIANT.MAIN_18_500}
            color={Colors.PRIMARY}
            style={setPadding(10, 16, 10, 16)}
          />
        </View>
      </View>
      <FlashList
        estimatedItemSize={300}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetchUserBoughtData}
          />
        }
        data={userBoughtData?.content}
        renderItem={({item}) => (
          <Pressable
            style={{...setPadding(0, 16, 0, 16)}}
            onPress={() => {
              navigation.navigate(ROUTES.DeliveryView, {
                id: item.lot_id,
                headerTitle: item.title || '',
              });
            }}>
            <ListItem
              image_url={item.image_url[0] ? item.image_url[0].url : ''}
              title={item.title}
              expiration_date={item.expiration_date}
              lot_id={item.lot_id}
              total_price={item.total_price}
              price_per_unit={item.price_per_unit}
              currency={item.currency}
              amount={item.leading ? item.leading.amount : null}
              weight={item.weight}
              quantity={item.quantity}
            />
          </Pressable>
        )}
      />
    </MainWrapper>
  );
};
