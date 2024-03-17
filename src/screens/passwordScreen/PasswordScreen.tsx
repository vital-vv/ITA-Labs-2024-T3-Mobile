import {FC} from 'react';
import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {ROUTES} from '../../constants/routes';
import {AccountStackParams} from '../../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TEXT_VARIANT} from '../../types/textVariant';
import {Colors} from '../../constants/colors';
import {setPadding} from '../../utils/styling/padding';

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.Password>;

export const PasswordScreen: FC<Props> = ({navigation, route}) => {
  return (
    <MainWrapper>
      <AppText text={'PasswordScreen'} style={setPadding(16, 16, 16, 16)} />
    </MainWrapper>
  );
};
