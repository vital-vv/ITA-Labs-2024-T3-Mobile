import {FC} from 'react';
import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {ROUTES} from '../../constants/routes';
import {AccountStackParams} from '../../types/navigation';
import {setPadding} from '../../utils/styling/padding';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Pressable} from 'react-native';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import English from '../../assets/icons/english.svg';
import {setMargin} from '../../utils/styling/margin';

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.Language>;

export const LanguageScreen: FC<Props> = ({navigation, route}) => {
  return (
    <MainWrapper>
      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 24,
        }}
        onPress={() => {
          navigation.navigate(ROUTES.Account);
        }}>
        <AppText
          text={'English'}
          style={setPadding(10, 16, 10, 16)}
          variant={TEXT_VARIANT.MAIN_18_400}
          color={Colors.PRIMARY}
        />
        <English style={setMargin(0, 16, 0, 0)} />
      </Pressable>
    </MainWrapper>
  );
};
