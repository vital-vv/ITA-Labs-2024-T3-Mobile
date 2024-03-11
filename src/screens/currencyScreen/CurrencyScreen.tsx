import {AppText} from '../../components/appText/appText';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {setPadding} from '../../utils/styling/padding';

export const CurrencyScreen = () => {
  return (
    <MainWrapper>
      <AppText
        text={'CurrencyScreen'}
        style={setPadding(16, 16, 16, 16)}
      />
    </MainWrapper>
  );
};
