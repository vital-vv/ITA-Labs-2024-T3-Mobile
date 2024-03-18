import {FC} from 'react';
import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {ROUTES} from '../../constants/routes';
import {AccountStackParams} from '../../types/navigation';
import {setPadding} from '../../utils/styling/padding';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import Checkbox_fill from '../../assets/icons/Checkbox_fill.svg';
import {setMargin} from '../../utils/styling/margin';
import styles from './settingsScreenStyles';

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.Settings>;

export const SettingsScreen: FC<Props> = ({navigation, route}) => {
  return (
    <MainWrapper>
      <View
        style={styles.container}>
        <Checkbox_fill style={setMargin(0, 0, 0, 16)} />
        <AppText
          text={'Notify me of new messages'}
          style={[{...setPadding(0, 0, 0, 12)}, styles.text]}
          variant={TEXT_VARIANT.MAIN_18_400}
          color={Colors.PRIMARY}
        />
      </View>
    </MainWrapper>
  );
};
