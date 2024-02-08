import {AppText} from '../../components/appText/appText';
import {Header} from '../../components/header/header';
import {setPadding} from '../../utils/styling/padding';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';

export const BetsScreen = () => {
  return (
    <MainWrapper>
      <AppText
        text={'Bets Initial Screen'}
        style={setPadding(16, 16, 16, 16)}
      />
    </MainWrapper>
  );
};
