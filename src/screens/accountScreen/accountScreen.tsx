import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';

export const AccountScreen = () => {
  return (
    <MainWrapper>
      <AppText
        text={'Account Initial Screen'}
        style={setPadding(16, 16, 16, 16)}
      />
    </MainWrapper>
  );
};
