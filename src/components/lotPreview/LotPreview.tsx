import {AppText} from '../appText/appText';
import {Colors} from '../../constants/colors';
import {TEXT_VARIANT} from '../../types/textVariant';
import {FC} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './lotPreviewStyles';
import React from 'react';
import {LotImage, SubCategory, imageUrl} from '../../types/api/lots';
import {DropdownArray} from '../../utils/helpers/transformValuesToRequestFunc';
import InfoIcon from '../../assets/icons/info.svg';
import {Carousel} from '../imageCarousel';

export type Props = {
  values: Record<string, string>;
  weightArray: DropdownArray[];
  currencyArray: DropdownArray[];
  packagingArray: DropdownArray[];
  lengthArray: DropdownArray[];
  countriesArray: DropdownArray[];
  varietyArray: SubCategory[];
  citiesArray: DropdownArray[];
  images: imageUrl[];
};

export const LotPreview: FC<Props> = ({
  values,
  weightArray,
  currencyArray,
  packagingArray,
  lengthArray,
  countriesArray,
  varietyArray,
  citiesArray,
  images,
}) => {
  const currentCurrency = currencyArray[Number(values.currency) - 1].label;
  const currentUnitOfWeight =
    weightArray[Number(values.unitOfWeight) - 1].label;
  let currentVariety;
  if (values.variety) {
    const currentVarietyArray = varietyArray[0].subcategories.filter(
      subcategory => subcategory.category_id === Number(values.variety),
    );
    currentVariety = currentVarietyArray[0].name;
  }
  const currentLength = lengthArray[Number(values.length_unit) - 1].label;

  const imagesCarouselData: LotImage[] = [];
  images.forEach(item => {
    if (item.imageURL) {
      imagesCarouselData.push({id: item.id, url: item.imageURL});
    }
  });

  return (
    <ScrollView style={styles.lotScreenWrapper}>
      <Carousel data={imagesCarouselData} />

      <View style={styles.titleWrapper}>
        {values.title && (
          <AppText
            color={Colors.PRIMARY}
            text={`${values.title}`}
            variant={TEXT_VARIANT.MAIN_20_500}
          />
        )}
      </View>
      {values.description && (
        <View style={styles.discriptionWrapper}>
          <InfoIcon />
          <AppText
            color={Colors.PRIMARY}
            text={`${values.description}`}
            variant={TEXT_VARIANT.MAIN_14_400}
            style={styles.discriptionText}
          />
        </View>
      )}
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
              text={`${currentCurrency} ${Number(values.price).toFixed(2)}`}
              variant={TEXT_VARIANT.MAIN_24_500}
              style={[styles.price]}
            />
          )}
          {values.price &&
            values.quantity &&
            !isNaN(Number(values.price)) &&
            !isNaN(Number(values.quantity)) && (
              <AppText
                text={`${currentCurrency} ${(
                  Number(values.price) / Number(values.quantity)
                ).toFixed(2)}/${currentUnitOfWeight}`}
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
            text={`${currentVariety}`}
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
            text={`${values.quantity} ${currentUnitOfWeight}`}
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
            text={`${values.size} ${currentLength}`}
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
            text={`${packagingArray[Number(values.packaging) - 1].label}`}
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
            text={`${countriesArray[Number(values.country) - 1].label}, ${
              citiesArray[Number(values.region) - 1].label
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
