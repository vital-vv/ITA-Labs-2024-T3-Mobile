import {AppText} from '../appText/appText';
import {Colors} from '../../constants/colors';
import {TEXT_VARIANT} from '../../types/textVariant';
import {FC} from 'react';
import {Image, ScrollView, View} from 'react-native';
import styles from './lotPreviewStyles';
import React from 'react';

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
  };
  data: any;
  weightArray: Array<any>;
  currencyArray: Array<any>;
  packagingArray: Array<any>;
  sizeArray: Array<any>;
};

export const LotPreview: FC<Props> = ({
  values,
  data,
  weightArray,
  currencyArray,
  packagingArray,
  sizeArray,
}) => {
  return (
    <ScrollView style={styles.lotScreenWrapper}>
      <Image
        style={styles.image}
        source={require('../../assets/images/apple_image.png')}
      />
      <View style={styles.titleWrapper}>
        {values.title && (
          <AppText
            color={Colors.PRIMARY}
            text={`${values.title}`}
            variant={TEXT_VARIANT.MAIN_20_500}
          />
        )}
      </View>
      <View style={styles.mainInfoWrapper}>
        <AppText
          text={'No bets'}
          variant={TEXT_VARIANT.MAIN_24_500}
          color={Colors.TERTIARY}
          style={[styles.text, styles.bets]}
        />
        <View style={styles.pricesWrapper}>
          <AppText
            text={'Total price'}
            variant={TEXT_VARIANT.MAIN_12_400}
            color={Colors.SECONDARY}
            style={[styles.price]}
          />
          {values.price && !isNaN(Number(values.price)) && (
            <AppText
              text={`$${Number(values.price).toFixed(2)}`}
              variant={TEXT_VARIANT.MAIN_24_500}
              style={[styles.price]}
            />
          )}
          {values.price &&
            values.quantity &&
            !isNaN(Number(values.price)) &&
            !isNaN(Number(values.quantity)) && (
              <AppText
                text={`$${(
                  Number(values.price) / Number(values.quantity)
                ).toFixed(2)}/kg`}
                variant={TEXT_VARIANT.MAIN_12_400}
                color={Colors.SECONDARY}
                style={[styles.price]}
              />
            )}
        </View>
        <AppText
          text={'Variety'}
          variant={TEXT_VARIANT.MAIN_16_400}
          color={Colors.SECONDARY}
          style={styles.text}
        />
        {values.variety && (
          <AppText
            text={`${values.variety}`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
        )}
        {!values.variety && <AppText text={''} style={styles.no_info} />}
        <AppText
          text={'Quantity'}
          variant={TEXT_VARIANT.MAIN_16_400}
          color={Colors.SECONDARY}
          style={styles.text}
        />
        {values.quantity && !isNaN(Number(values.quantity)) && (
          <AppText
            text={`${values.quantity}`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
        )}
        {!values.quantity && <AppText text={''} style={styles.no_info} />}
        <AppText
          text={'Size'}
          variant={TEXT_VARIANT.MAIN_16_400}
          color={Colors.SECONDARY}
          style={styles.text}
        />
        {values.size && (
          <AppText
            text={`${sizeArray[Number(values.size)].label}`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
        )}
        {!values.size && <AppText text={''} style={styles.no_info} />}
        <AppText
          text={'Packaging'}
          variant={TEXT_VARIANT.MAIN_16_400}
          color={Colors.SECONDARY}
          style={styles.text}
        />
        {values.packaging && (
          <AppText
            text={`${packagingArray[Number(values.packaging)].label}`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
        )}
        {!values.packaging && <AppText text={''} style={styles.no_info} />}
        <AppText
          text={'Location'}
          variant={TEXT_VARIANT.MAIN_16_400}
          color={Colors.SECONDARY}
          style={styles.text}
        />
        {values.country && values.region && (
          <AppText
            text={`${data.countries[Number(values.country) - 1].countryName}, ${
              data.countries[Number(values.country) - 1].regions[
                Number(values.region) - 1
              ].regionName
            }`}
            variant={TEXT_VARIANT.MAIN_16_400}
            style={styles.text}
          />
        )}
        {!values.country && !values.region && (
          <AppText text={''} style={styles.no_info} />
        )}
      </View>
    </ScrollView>
  );
};
