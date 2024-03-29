import {Image, View} from 'react-native';
import React, {FC} from 'react';
import {styles} from './listItemStyle';
import {HorizontalDivider} from '../horizontalDivider/horizontalDivider';
import {AppText} from '../appText/appText';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import {setMargin} from '../../utils/styling/margin';
import {DateCounter} from '../DateCounter/dateCounter';
import {Currency, Weight} from '../../types/api/info';
import AlertIcon from '../../assets/icons/alert.svg';

type Props = {
  title: string;
  expiration_date: string;
  lot_id: number;
  total_price: number;
  price_per_unit: number;
  position?: 'leading' | 'outbid';
  currency: Currency;
  amount: number | null;
  weight: Weight;
  quantity: number;
  image_url?: string;
};

export const ListItem: FC<Props> = ({
  title,
  expiration_date,
  lot_id,
  total_price,
  price_per_unit,
  currency,
  amount,
  weight,
  position,
  image_url,
  quantity,
}) => {
  return (
    <>
      <HorizontalDivider />
      <View style={styles.item}>
        <Image style={styles.image} source={{uri: image_url}} />
        <View style={styles.lot_info}>
          <AppText text={title} variant={TEXT_VARIANT.MAIN_16_400} />
          <View style={styles.lot_block}>
            <DateCounter date={expiration_date} />
            <AppText
              text={lot_id}
              variant={TEXT_VARIANT.MAIN_10_400}
              color={Colors.SECONDARY}
            />
          </View>
          <View style={[styles.bets_block, {...setMargin(16, 0, 0, 0)}]}>
            {position == 'outbid' && <AlertIcon />}
            {amount ? (
              <View style={styles.lot_block}>
                <AppText
                  text={`${currency} ${amount}`}
                  variant={TEXT_VARIANT.MAIN_16_400}
                  color={
                    amount === 0
                      ? Colors.TERTIARY
                      : position == 'leading'
                      ? Colors.SYSTEM_BASE
                      : position == 'outbid'
                      ? Colors.WARNING
                      : Colors.WARNING
                  }
                  style={{lineHeight: 24}}
                />
                <AppText
                  text={`${currency} ${(amount / quantity).toFixed(
                    2,
                  )}/${weight}`}
                  variant={TEXT_VARIANT.MAIN_10_400}
                  color={Colors.SECONDARY}
                />
              </View>
            ) : (
              <AppText
                text={'No bets'}
                variant={TEXT_VARIANT.MAIN_16_400}
                color={Colors.SECONDARY}
                style={{...setMargin(16, 0, 0, 0), lineHeight: 24}}
              />
            )}
          </View>
          <View style={styles.lot_block}>
            <AppText
              text={`${currency} ${total_price}`}
              variant={TEXT_VARIANT.MAIN_16_400}
            />
            <AppText
              text={`${currency} ${price_per_unit.toFixed(2)}/${weight}`}
              variant={TEXT_VARIANT.MAIN_10_400}
              color={Colors.SECONDARY}
            />
          </View>
        </View>
      </View>
    </>
  );
};
