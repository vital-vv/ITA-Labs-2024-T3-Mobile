import {Image, RefreshControl, ScrollView, TextInput, View} from 'react-native';
import styles from './lotViewStyles';
import {FC, useState} from 'react';
import {AppText} from '../../components/appText/appText';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import {DateTime} from 'luxon';
import {DateCounter} from '../../components/DateCounter/dateCounter';
import {Lot} from '../../types/api/api';
import AlertIcon from '../../assets/icons/alert.svg';

type Props = {
  lot: Lot;
  position?: 'leading'|'outbid'
};

export const LotView: FC<Props> = ({lot, position}) => {

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={require('../../assets/images/apple_image.png')}
      />
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
          <View style={[styles.bets_block, styles.price]}>
            {position == 'outbid' && <AlertIcon/>}
          <AppText
            text={`$${(lot.price_per_unit * lot.quantity).toFixed(2)}`}
            variant={TEXT_VARIANT.MAIN_24_500}
            color={
              (position == 'leading') ? Colors.SYSTEM_BASE :
              (position == 'outbid') ? Colors.ERROR_BASE : Colors.WARNING}
          />
          </View>
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
    </ScrollView>
  )
}