import {Image, RefreshControl, ScrollView, TextInput, View} from 'react-native';
import {styles} from './lotScreenStyles';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon';
import {FC, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {useGetLotQuery} from '../../api/endpoints';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {AppText} from '../../components/appText/appText';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import ShoppingIcon from '../../assets/icons/shopping.svg';
import {DateTime} from 'luxon';
import {DateCounter} from '../../components/DateCounter/dateCounter';
import {setMargin} from '../../utils/styling/margin';
import {ModalWindow} from '../../components/modal/modal';
import inputStyles from '../../components/formElements/Input/inputStyles';
import {Carousel} from '../../components/imageCarousel';
type Props = NativeStackScreenProps<HomeStackParams, ROUTES.Lot>;

export const LotScreen: FC<Props> = ({navigation, route}) => {
  const {id} = route.params;
  const {data: lot, isLoading, refetch: refetchLot} = useGetLotQuery(id);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (isLoading) return <SpinnerWrapper />;
  return (
    lot && (
      <ScrollView
        style={styles.lotScreenWrapper}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetchLot} />
        }>
        <Carousel data={lot.image_url} />
        <View style={styles.titleWrapper}>
          <AppText text={`${lot.title}`} variant={TEXT_VARIANT.MAIN_20_500} />
          <View style={styles.dateInfo}>
            <DateCounter date={lot.expiration_date} />
            <AppText
              text={`${lot.lot_id}`}
              variant={TEXT_VARIANT.MAIN_10_400}
              color={Colors.SECONDARY}
            />
          </View>
        </View>
        <View style={styles.mainInfoWrapper}>
          <View style={styles.pricesWrapper}>
            <AppText
              text={`$${(lot.price_per_unit * lot.quantity).toFixed(2)}`}
              variant={TEXT_VARIANT.MAIN_24_500}
              color={Colors.WARNING}
              style={[styles.text, styles.price]}
            />
            <AppText
              text={`$${(lot.price_per_unit * lot.quantity).toFixed(2)}`}
              variant={TEXT_VARIANT.MAIN_24_500}
              style={[styles.text, styles.price]}
            />
            <AppText
              text={`$${lot.price_per_unit}/kg`}
              variant={TEXT_VARIANT.MAIN_12_400}
              color={Colors.SECONDARY}
              style={[styles.text, styles.price]}
            />
            <AppText
              text={`$${lot.price_per_unit}/kg`}
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
            text={`${lot.variety}`}
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
            text={`${lot.quantity}`}
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
            text={`${lot.size}`}
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
            text={`${lot.packaging}`}
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
            text={`${lot.location.country}, ${lot.location.region}`}
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
            text={`${DateTime.fromISO('2024-03-05T15:20:00Z').toFormat(
              'yyyy.LL.dd, HH:mm ',
            )}`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
        </View>
        <View style={styles.buttons}>
          <ButtonWithIcon
            title="Place a bet"
            type="light"
            icon={<ShoppingIcon fill={Colors.BUTTON_PRIMARY} />}
            onPress={() => setIsModalVisible(true)}
          />
          <ButtonWithIcon
            title="Buy now"
            type="dark"
            icon={<ShoppingIcon fill={Colors.WHITE} />}
          />
        </View>
        <ModalWindow isOpen={isModalVisible} onClose={setIsModalVisible}>
          <TextInput
            keyboardType="number-pad"
            placeholder="$"
            style={inputStyles.input}
            maxLength={20}
          />
          <AppText
            text={`Price from ${lot.price_per_unit * lot.quantity} to ${
              lot.price_per_unit * lot.quantity
            }`}
            variant={TEXT_VARIANT.MAIN_12_400}
            color={Colors.SECONDARY}
            style={setMargin(4, 0, 16, 0)}
          />
          <ButtonWithIcon
            type="dark"
            title={`Bet $${lot.price_per_unit * lot.quantity}`}
          />
        </ModalWindow>
      </ScrollView>
    )
  );
};
