import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';
import {currentUserActions} from '../../store/slices/currentUserSlice';
import {PersonalDataAccountForm} from '../../components/forms/PersonalDataAccountForm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AccountStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {FC} from 'react';

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.PersonalData>;

export const PersonalDataScreen: FC<Props> = ({navigation, route}) => {
  const {isLoggedIn} = currentUserActions;
  const {user} = route.params;

  return (
    <MainWrapper>
      <PersonalDataAccountForm user={user} style={{flex: 1}} />
    </MainWrapper>
  );
};
