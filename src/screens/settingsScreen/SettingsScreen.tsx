import {FC} from 'react';
import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {ROUTES} from '../../constants/routes';
import {AccountStackParams} from '../../types/navigation';
import {setPadding} from '../../utils/styling/padding';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions, View} from 'react-native';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import Checkbox_fill from '../../assets/icons/Checkbox_fill.svg';
import {setMargin} from '../../utils/styling/margin';
const screenWidth = Dimensions.get('window').width;

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.Settings>;

export const SettingsScreen: FC<Props> = ({navigation, route}) => {
  return (
    <MainWrapper>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 24,
        }}>
        <Checkbox_fill style={setMargin(0, 0, 0, 16)} />
        <AppText
          text={'Notify me of new messages'}
          style={{...setPadding(0, 0, 0, 12), width: screenWidth - 68}}
          variant={TEXT_VARIANT.MAIN_18_400}
          color={Colors.PRIMARY}
        />
      </View>
    </MainWrapper>
  );
};
