import {AccountStack} from '.';
import {ROUTES} from '../../../constants/routes';
import {AccountScreen} from '../../../screens/accountScreen/accountScreen';
import {CurrencyScreen} from '../../../screens/currencyScreen/CurrencyScreen';
import {LanguageScreen} from '../../../screens/languageScreen/LanguageScreen';
import {NotificationsScreen} from '../../../screens/notificationsScreen/NotificationsScreen';
import {PasswordScreen} from '../../../screens/passwordScreen/PasswordScreen';
import {PersonalDataScreen} from '../../../screens/personalDataScreen/PersonalDataScreen';
import {SettingsScreen} from '../../../screens/settingsScreen/SettingsScreen';
import {MyAdsScreenStack} from '../myAdsStack/myAdsScreenStack';

export const protectedScreens = {
  [ROUTES.Account]: (
    <AccountStack.Screen
      name={ROUTES.Account}
      component={AccountScreen}
      options={{
        headerShown: false,
      }}
    />
  ),
  [ROUTES.PersonalData]: (
    <AccountStack.Screen
      name={ROUTES.PersonalData}
      component={PersonalDataScreen}
      options={{title: 'Personal data'}}
    />
  ),
  [ROUTES.MyAdsStack]: (
    <AccountStack.Screen
      name={ROUTES.MyAdsStack}
      component={MyAdsScreenStack}
      options={{
        headerShown: false,
      }}
    />
  ),
  [ROUTES.Notifications]: (
    <AccountStack.Screen
      name={ROUTES.Notifications}
      component={NotificationsScreen}
      options={{title: 'Notifications'}}
    />
  ),

  [ROUTES.Currency]: (
    <AccountStack.Screen
      name={ROUTES.Currency}
      component={CurrencyScreen}
      options={{title: 'Currency'}}
    />
  ),

  [ROUTES.Language]: (
    <AccountStack.Screen
      name={ROUTES.Language}
      component={LanguageScreen}
      options={{title: 'Language'}}
    />
  ),
  [ROUTES.Settings]: (
    <AccountStack.Screen
      name={ROUTES.Settings}
      component={SettingsScreen}
      options={{title: 'Settings'}}
    />
  ),
  [ROUTES.Password]: (
    <AccountStack.Screen
      name={ROUTES.Password}
      component={PasswordScreen}
      options={{title: 'Change Password'}}
    />
  ),
};
