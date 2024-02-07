import {View} from 'react-native';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import GreensIcon from '../../assets/icons/greens.svg';
import {AppText} from '../appText/appText';
import {styles} from './productCategoryStyles';
import {TEXT_VARIANT} from '../../types/textVariant';

export type ProductCategoryProps = {
  categoryTitle: string;
};

export const ProductCategory = ({categoryTitle}: ProductCategoryProps) => {
  return (
    <>
      <View style={styles.categoryWrapper}>
        <View style={styles.categoryTitle}>
          <GreensIcon />
          <AppText text={categoryTitle} variant={TEXT_VARIANT.MAIN_18_500} />
        </View>
        <ArrowRightIcon />
      </View>
    </>
  );
};
