import {AppText} from '../appText/appText';
import {MainWrapper} from '../mainWrapper/mainWrapper';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import {styles} from './preloaderStyles';

export const Preloader = () => (
  <MainWrapper style={styles.wrapper}>
    <AppText
      text="AGROEX"
      variant={TEXT_VARIANT.MAIN_30_800}
      color={Colors.BUTTON_PRIMARY}
    />
  </MainWrapper>
);
