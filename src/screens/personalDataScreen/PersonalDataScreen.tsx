import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';

export const PersonalDataScreen = () => {
  return (
    <MainWrapper>
      <AppText
        text={'PersonalDataScreen'}
        style={setPadding(16, 16, 16, 16)}
      />
    </MainWrapper>
  );
};
