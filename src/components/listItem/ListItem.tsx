import {Image, View} from 'react-native';
import React, {FC} from 'react';
import {styles} from './listItemStyle';
import {HorizontalDivider} from '../horizontalDivider/horizontalDivider';
import {ROUTES} from '../../constants/routes';
import {RootStackParams} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Lot} from '../../types/api/api';
import {AppText} from '../appText/appText';
import {textTypographyStyles} from '../../styles/textTypographyStyles';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import {setMargin} from '../../utils/styling/margin';

type Props = {
  lot: Lot;
};

export const ListItem: FC<Props> = ({lot}) => {
  const {title, expiration_date, lot_id, quantity, price_per_unit} = lot;

  return (
    <>
      <HorizontalDivider />
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={require('../../assets/images/apple_image.png')}
        />
        <View style={styles.lot_info}>
          <AppText text={title} variant={TEXT_VARIANT.MAIN_16_400} />
          <View style={styles.lot_block}>
            <AppText
              text={expiration_date}
              variant={TEXT_VARIANT.MAIN_10_500}
              color={Colors.SYSTEM_DARK}
              style={styles.expiration}
            />
            <AppText
              text={lot_id}
              variant={TEXT_VARIANT.MAIN_10_400}
              color={Colors.SECONDARY}
            />
          </View>
          <AppText
            text={'No bets'}
            variant={TEXT_VARIANT.MAIN_16_400}
            color={Colors.SECONDARY}
            style={{...setMargin(16, 0, 0, 0), lineHeight: 24}}
          />
          <View style={styles.lot_block}>
            <AppText
              text={`$${(quantity * price_per_unit).toFixed(2)}`}
              variant={TEXT_VARIANT.MAIN_16_400}
            />
            <AppText
              text={`$${price_per_unit}/kg`}
              variant={TEXT_VARIANT.MAIN_10_400}
              color={Colors.SECONDARY}
            />
          </View>
        </View>
      </View>
    </>
  );
};