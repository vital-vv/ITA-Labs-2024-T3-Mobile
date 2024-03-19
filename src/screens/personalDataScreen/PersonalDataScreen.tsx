import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {PersonalDataAccountForm} from '../../components/forms/PersonalDataAccountForm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AccountStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {FC} from 'react';
import {useAppSelector} from '../../store/hooks';
import {selector} from '../../store/selector';

type Props = NativeStackScreenProps<AccountStackParams, ROUTES.PersonalData>;

export const PersonalDataScreen: FC<Props> = ({navigation, route}) => {
  const user = useAppSelector(selector.currentUserSliceData);
  const {isLoggedIn} = useAppSelector(selector.currentUserSliceData);
  return (
    <MainWrapper>
      <PersonalDataAccountForm style={{flex: 1}} />
    </MainWrapper>
  );
};
