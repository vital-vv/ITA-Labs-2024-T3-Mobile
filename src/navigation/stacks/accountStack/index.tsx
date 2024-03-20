import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AccountStackParams} from '../../../types/navigation';
import {ROUTES} from '../../../constants/routes';
import {useAppSelector} from '../../../store/hooks';
import {selector} from '../../../store/selector';
import {protectedScreens} from './protectedScreens';
import {publicScreens} from './publicScreens';

export const AccountStack = createNativeStackNavigator<AccountStackParams>();

export const AccountScreenStack = () => {
  const {isLoggedIn} = useAppSelector(selector.currentUserSliceData);
  const initialRouteName = isLoggedIn ? ROUTES.Account : ROUTES.GuestAccount;
  return (
    <AccountStack.Navigator initialRouteName={initialRouteName}>
      {isLoggedIn ? (
        <>
          {protectedScreens.Account}
          {protectedScreens.Currency}
          {protectedScreens.Language}
          {protectedScreens.MyAds}
          {protectedScreens.Notifications}
          {protectedScreens.Password}
          {protectedScreens.PersonalData}
          {protectedScreens.Settings}
        </>
      ) : (
        publicScreens.Account
      )}
    </AccountStack.Navigator>
  );
};
