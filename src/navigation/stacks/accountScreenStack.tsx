import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AccountStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {Header} from '../../components/header/header';
import {AccountScreen} from '../../screens/accountScreen/accountScreen';
import {PersonalDataScreen} from '../../screens/personalDataScreen/PersonalDataScreen';
import {MyAdsScreen} from '../../screens/myAdsScreen/MyAdsScreen';
import {NotificationsScreen} from '../../screens/notificationsScreen/NotificationsScreen';
import {CurrencyScreen} from '../../screens/currencyScreen/CurrencyScreen';
import {LanguageScreen} from '../../screens/languageScreen/LanguageScreen';
import {SettingsScreen} from '../../screens/settingsScreen/SettingsScreen';
import {PasswordScreen} from '../../screens/passwordScreen/PasswordScreen';

const AccountStack = createNativeStackNavigator<AccountStackParams>();

export const AccountScreenStack = () => {
  return (
    <AccountStack.Navigator initialRouteName={ROUTES.Account}>
      <AccountStack.Screen
        name={ROUTES.Account}
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <AccountStack.Screen
        name={ROUTES.PersonalData}
        component={PersonalDataScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
      <AccountStack.Screen
        name={ROUTES.MyAds}
        component={MyAdsScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
      <AccountStack.Screen
        name={ROUTES.Notifications}
        component={NotificationsScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
      <AccountStack.Screen
        name={ROUTES.Currency}
        component={CurrencyScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
      <AccountStack.Screen
        name={ROUTES.Language}
        component={LanguageScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
      <AccountStack.Screen
        name={ROUTES.Settings}
        component={SettingsScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
      <AccountStack.Screen
        name={ROUTES.Password}
        component={PasswordScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
    </AccountStack.Navigator>
  );
};
