import {ScrollView, View} from 'react-native';
import styles from './lotViewStyles';
import {FC} from 'react';
import {AppText} from '../../components/appText/appText';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import {DateCounter} from '../../components/DateCounter/dateCounter';
import {Lot} from '../../types/api/lots';
import InfoIcon from '../../assets/icons/info.svg';
import {lotViewData} from './utils/lotViewData';
import {Carousel} from '../imageCarousel';

type Props = {
  lot: Lot;
  position?: 'leading' | 'outbid' | 'success' | 'none';
};

export const LotView: FC<Props> = ({lot, position}) => {
  return (
    <ScrollView>
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
      {lot.description && (
        <View style={styles.discriptionWrapper}>
          <InfoIcon />
          <AppText
            color={Colors.PRIMARY}
            text={`${lot.description}`}
            variant={TEXT_VARIANT.MAIN_14_400}
            style={styles.discriptionText}
          />
        </View>
      )}
      <View style={styles.mainInfoWrapper}>
        <View style={styles.pricesWrapper}>
          <View style={[styles.bets_block, styles.price]}>
            <AppText
              text={
                lot.leading
                  ? `${lot.currency} ${lot.leading.amount.toFixed(2)}`
                  : 'No bets'
              }
              variant={TEXT_VARIANT.MAIN_24_500}
              color={
                position === 'leading'
                  ? Colors.SYSTEM_BASE
                  : position === 'success'
                  ? Colors.SUCCEESS
                  : Colors.WARNING
              }
            />
          </View>
          <AppText
            text={`${lot.currency} ${lot.total_price.toFixed(2)}`}
            variant={TEXT_VARIANT.MAIN_24_500}
            style={[styles.text, styles.price]}
          />
          <AppText
            text={
              lot.leading
                ? `${lot.currency} ${(
                    lot.leading.amount / lot.quantity
                  ).toFixed(2)}/${lot.weight}`
                : ''
            }
            variant={TEXT_VARIANT.MAIN_12_400}
            color={Colors.SECONDARY}
            style={[styles.text, styles.price]}
          />
          <AppText
            text={`${lot.currency} ${lot.price_per_unit.toFixed(2)}/${
              lot.weight
            }`}
            variant={TEXT_VARIANT.MAIN_12_400}
            color={Colors.SECONDARY}
            style={[styles.text, styles.price]}
          />
        </View>
        {lotViewData(lot).map((item, index) => (
          <AppText
            key={index}
            text={item.text}
            variant={TEXT_VARIANT.MAIN_16_400}
            color={item.color ? Colors.SECONDARY : Colors.PRIMARY}
            style={styles.text}
          />
        ))}
      </View>
    </ScrollView>
  );
};
