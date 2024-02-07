import {View} from 'react-native';
import {AppText} from '../../components/appText/appText';
import {Header} from '../../components/header/header';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';

export const NewAdsScreen = () => {
  return (
    <MainWrapper>
      <AppText
        text={'New Ads Initial Screen'}
        style={setPadding(16, 16, 16, 16)}
      />
    </MainWrapper>
  );
};
