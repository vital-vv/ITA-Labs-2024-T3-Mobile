import {View} from 'react-native';
import AgroExLogoIcon from '../../assets/icons/agroexLogo.svg';
import {styles} from './headerStyles';
import {AppText} from '../appText/appText';
import {Colors} from '../../constants/colors';
import {TEXT_VARIANT} from '../../types/textVariant';
import {FC} from 'react';

export type Props = {
  searchBtn?: boolean;
  goBackBtn?: boolean;
  title?: string;
};

export const Header: FC = () => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerTitle}>
        <AgroExLogoIcon />
        <AppText
          text={`AGROEX`}
          color={Colors.AGROEX_MAIN}
          variant={TEXT_VARIANT.MAIN_18_500}></AppText>
      </View>
    </View>
  );
};
