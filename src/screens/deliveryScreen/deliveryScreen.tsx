import {AppText} from '../../components/appText/appText';
import { PersonalDataForm } from '../../components/forms/PersonalDataForm';
import {Header} from '../../components/header/header';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';

export const DeliveryScreen = () => {
  return (
    <MainWrapper>
      <AppText
        text={'Delivery Initial Screen'}
        style={setPadding(16, 16, 16, 16)}
      />
      <PersonalDataForm />
    </MainWrapper>
  );
};
