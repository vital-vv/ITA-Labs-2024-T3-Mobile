import {RootStack} from '.';
import {ROUTES} from '../../../constants/routes';
import {AccountScreen} from '../../../screens/accountScreen/accountScreen';
import {AuthScreen} from '../../../screens/authScreen/authScreen';
import {OnBoardingScreen} from '../../../screens/onBoardingScreen/onBoardingScreen';
import {HomeScreenStack} from '../homeStack/homeScreenStack';
import HomeIcon from '../../../assets/icons/bottomTabNavIcons/home.svg';
import AccountIcon from '../../../assets/icons/bottomTabNavIcons/account.svg';
import {AccountScreenStack} from '../accountStack';

export const publicScreens = {
  [ROUTES.HomeStack]: (
    <RootStack.Screen
      name={ROUTES.HomeStack}
      component={HomeScreenStack}
      options={{
        tabBarIcon: ({color}) => <HomeIcon fill={`${color}`} />,
      }}
    />
  ),
  [ROUTES.AccountStack]: (
    <RootStack.Screen
      name={ROUTES.AccountStack}
      component={AccountScreenStack}
      options={{
        tabBarIcon: ({color}) => <AccountIcon fill={`${color}`} />,
      }}
    />
  ),
  [ROUTES.OnBoarding]: (
    <RootStack.Screen
      name={ROUTES.OnBoarding}
      component={OnBoardingScreen}
      options={{
        tabBarButton: () => null,
        tabBarStyle: {display: 'none'},
      }}
    />
  ),
  [ROUTES.Auth]: (
    <RootStack.Screen
      name={ROUTES.Auth}
      component={AuthScreen}
      options={{
        tabBarButton: () => null,
        tabBarStyle: {display: 'none'},
      }}
    />
  ),
};
