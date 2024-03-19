import {AccountStack} from '.';
import {Header} from '../../../components/header/header';
import {ROUTES} from '../../../constants/routes';
import {GuestAccountScreen} from '../../../screens/guestAccountScreen/guestAccountScreen';

export const publicScreens = {
  [ROUTES.Account]: (
    <AccountStack.Screen
      name={ROUTES.GuestAccount}
      component={GuestAccountScreen}
      options={{
        headerTitle: Header,
      }}
    />
  ),
};
