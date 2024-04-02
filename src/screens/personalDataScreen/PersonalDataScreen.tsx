import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {PersonalDataAccountForm} from '../../components/forms/personalData/PersonalDataAccountForm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AccountStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {FC} from 'react';

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.PersonalData>;

export const PersonalDataScreen: FC<Props> = ({navigation, route}) => {
  return (
    <MainWrapper>
      <PersonalDataAccountForm style={{flex: 1}} />
    </MainWrapper>
  );
};
