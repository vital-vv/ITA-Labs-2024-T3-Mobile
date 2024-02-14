import {AppText} from '../appText/appText';
import {Colors} from '../../constants/colors';
import {TEXT_VARIANT} from '../../types/textVariant';
import {FC} from 'react';
import {Image, ScrollView, View} from 'react-native';
import styles from './lotPreviewStyles';

export type Props = {
  values: { 
        title?: string;
    category?: string;
    subcategory?: string;
    quantity?: string;
    unitOfWeight?: string;
    price?: string;
    currency?: string;
    country?: string;
    region?: string;
    size?: string;
    packaging?: string;
    variety?: string;
}
}

export const LotPreview: FC<Props> = ({values}) => {
  
    return (
        <ScrollView style={styles.lotScreenWrapper}>
          <Image
            style={styles.image}
            source={require('../../assets/images/apple_image.png')}
          />
          <View style={styles.titleWrapper}>
            {values.title &&
            <AppText
              text={`${values.title}`}
              variant={TEXT_VARIANT.MAIN_20_500}
            />
            }
            {/* <View style={styles.dateInfo}>
              <AppText
                text={`${lotData.expiration_date}`}
                variant={TEXT_VARIANT.MAIN_10_500}
                color={Colors.SYSTEM_DARK}
                style={styles.expiration}
              />
            </View> */}
          </View>
          <View style={styles.mainInfoWrapper}>
              <AppText
                text={'No bets'}
                variant={TEXT_VARIANT.MAIN_24_500}
                color={Colors.TERTIARY}
                style={[styles.text, styles.price, styles.bets]}
              />
            <View style={styles.pricesWrapper}>
              <AppText
                text={'Total price'}
                variant={TEXT_VARIANT.MAIN_12_400}
                color={Colors.SECONDARY}
                style={[styles.text, styles.price]}
                />
             {values.price && values.quantity &&
              <AppText
                text={`$${(Number(values.price) * Number(values.quantity)).toFixed(
                  2,
                )}`}
                variant={TEXT_VARIANT.MAIN_24_500}
                style={[styles.text, styles.price]}
              /> }
            {values.price && values.quantity &&
              <AppText
                text={`$${(Number(values.price) / Number(values.quantity)).toFixed(
                    2,)}/kg`}
                variant={TEXT_VARIANT.MAIN_12_400}
                color={Colors.SECONDARY}
                style={[styles.text, styles.price]}
              />
            }
            </View>
            <AppText
              text={'Variety'}
              variant={TEXT_VARIANT.MAIN_16_400}
              color={Colors.SECONDARY}
              style={styles.text}
            />
            {values.variety &&
            <AppText
              text={`${values.variety}`}
              variant={TEXT_VARIANT.MAIN_16_400}
              style={styles.text}
            />
            }
            {!values.variety &&
            <AppText
              text={``}
              style={styles.no_info}
            />
            }
            <AppText
              text={'Quantity'}
              variant={TEXT_VARIANT.MAIN_16_400}
              color={Colors.SECONDARY}
              style={styles.text}
            />
            {values.quantity &&
            <AppText
              text={`${values.quantity}`}
              variant={TEXT_VARIANT.MAIN_16_400}
              style={styles.text}
            />
            }
             {!values.quantity &&
            <AppText
              text={``}
              style={styles.no_info}
            />
            }
            <AppText
              text={'Size'}
              variant={TEXT_VARIANT.MAIN_16_400}
              color={Colors.SECONDARY}
              style={styles.text}
            />
            {values.size &&
            <AppText
              text={`${values.size}`}
              variant={TEXT_VARIANT.MAIN_16_400}
              style={styles.text}
            />
            } 
             {!values.size &&
            <AppText
              text={``}
              style={styles.no_info}
            />
            }          
            <AppText
              text={'Packaging'}
              variant={TEXT_VARIANT.MAIN_16_400}
              color={Colors.SECONDARY}
              style={styles.text}
            />
            {values.packaging &&
            <AppText
              text={`${values.packaging}`}
              variant={TEXT_VARIANT.MAIN_16_400}
              style={styles.text}
            />
            }
            {!values.packaging &&
            <AppText
              text={``}
              style={styles.no_info}
            />
            }
            <AppText
              text={'Location'}
              variant={TEXT_VARIANT.MAIN_16_400}
              color={Colors.SECONDARY}
              style={styles.text}
            />
            {values.country && values.region &&
            <AppText
              text={`${values.country}, ${values.region}`}
              variant={TEXT_VARIANT.MAIN_16_400}
              style={styles.text}
            />
            }
             {!values.country && !values.region &&
            <AppText
              text={``}
              style={styles.no_info}
            />
            }
          </View>
        </ScrollView>
    );
  };
  
