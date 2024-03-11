import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';

export const MyAdsScreen = () => {
  return (
    <MainWrapper>
      <AppText
        text={'MyAdsScreen'}
        style={setPadding(16, 16, 16, 16)}
      />
    </MainWrapper>
  );
};
