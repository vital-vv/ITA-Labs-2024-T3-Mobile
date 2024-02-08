import {Image, ScrollView, View} from 'react-native';
import {styles} from './lotScreenStyles';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon';
import {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {useGetLotQuery} from '../../api/endpoints';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {AppText} from '../../components/appText/appText';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import ShoppingIcon from '../../assets/icons/shopping.svg';
type Props = NativeStackScreenProps<RootStackParams, ROUTES.Lot>;

export const LotScreen: FC<Props> = ({navigation, route}) => {
  const {id} = route.params;
  const {data: lots, isLoading, refetch: refetchLot} = useGetLotQuery(id);

  const lotData = lots ? lots[0] : null;
  const lotName = lots ? lots[0].category_name : '';
  if (isLoading) return <SpinnerWrapper />;

  return (
    lotData && (
      <ScrollView style={styles.lotScreenWrapper}>
        <Image
          style={styles.image}
          source={require('../../assets/images/apple_image.png')}
        />
        <View style={styles.titleWrapper}>
          <AppText
            text={`${lotData.title}`}
            variant={TEXT_VARIANT.MAIN_20_500}
          />
          <View style={styles.dateInfo}>
            <AppText
              text={`${lotData.expiration_date}`}
              variant={TEXT_VARIANT.MAIN_10_500}
              color={Colors.SYSTEM_DARK}
              style={styles.expiration}
            />
            <AppText
              text={`${lotData.lot_id}`}
              variant={TEXT_VARIANT.MAIN_10_400}
              color={Colors.SECONDARY}
            />
          </View>
        </View>
        <View style={styles.mainInfoWrapper}>
          <View style={styles.pricesWrapper}>
            <AppText
              text={`$${(lotData.price_per_unit * lotData.quantity).toFixed(
                2,
              )}`}
              variant={TEXT_VARIANT.MAIN_24_500}
              color={Colors.WARNING}
              style={[styles.text, styles.price]}
            />
            <AppText
              text={`$${(lotData.price_per_unit * lotData.quantity).toFixed(
                2,
              )}`}
              variant={TEXT_VARIANT.MAIN_24_500}
              style={[styles.text, styles.price]}
            />
            <AppText
              text={`$${lotData.price_per_unit}/kg`}
              variant={TEXT_VARIANT.MAIN_12_400}
              color={Colors.SECONDARY}
              style={[styles.text, styles.price]}
            />
            <AppText
              text={`$${lotData.price_per_unit}/kg`}
              variant={TEXT_VARIANT.MAIN_12_400}
              color={Colors.SECONDARY}
              style={[styles.text, styles.price]}
            />
          </View>
          <AppText
            text={'Variety'}
            variant={TEXT_VARIANT.MAIN_16_400}
            color={Colors.SECONDARY}
            style={styles.text}
          />
          <AppText
            text={`${lotData.variety}`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
          <AppText
            text={'Quantity'}
            variant={TEXT_VARIANT.MAIN_16_400}
            color={Colors.SECONDARY}
            style={styles.text}
          />
          <AppText
            text={`${lotData.quantity}`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
          <AppText
            text={'Size'}
            variant={TEXT_VARIANT.MAIN_16_400}
            color={Colors.SECONDARY}
            style={styles.text}
          />
          <AppText
            text={`${lotData.size}`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
          <AppText
            text={'Packaging'}
            variant={TEXT_VARIANT.MAIN_16_400}
            color={Colors.SECONDARY}
            style={styles.text}
          />
          <AppText
            text={`${lotData.packaging}`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
          <AppText
            text={'Location'}
            variant={TEXT_VARIANT.MAIN_16_400}
            color={Colors.SECONDARY}
            style={styles.text}
          />
          <AppText
            text={`${lotData.location.country}, ${lotData.location.region}`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
          <AppText
            text={'Created'}
            variant={TEXT_VARIANT.MAIN_16_400}
            color={Colors.SECONDARY}
            style={styles.text}
          />
          <AppText
            text={`${lotData.created_at}`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
        </View>
        <View style={styles.buttons}>
          <ButtonWithIcon
            title="Place a bet"
            type="light"
            icon={<ShoppingIcon fill={Colors.BUTTON_PRIMARY} />}
          />
          <ButtonWithIcon
            title="Buy now"
            type="dark"
            icon={<ShoppingIcon fill={Colors.WHITE} />}
          />
        </View>
      </ScrollView>
    )
  );
};