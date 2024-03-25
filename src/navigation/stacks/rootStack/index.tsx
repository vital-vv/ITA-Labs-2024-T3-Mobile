import {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParams} from '../../../types/navigation';
import {useAppSelector} from '../../../store/hooks';
import {selector} from '../../../store/selector';
import {ROUTES} from '../../../constants/routes';
import {Colors} from '../../../constants/colors';
import {publicScreens} from './publicScreens';
import {protectedScreens} from './protectedScreens';
import {useHubEventsListener} from '../../../aws/hooks/useHubEventsListener';

export const RootStack = createBottomTabNavigator<RootStackParams>();

export const RootStackNavigator: FC = () => {
  useHubEventsListener();
  const {isLoggedIn, isOnboarded} = useAppSelector(
    selector.currentUserSliceData,
  );
  const initialRouteName = isLoggedIn
    ? isOnboarded
      ? ROUTES.HomeStack
      : ROUTES.OnBoarding
    : ROUTES.HomeStack;

  return (
    <RootStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarActiveTintColor: Colors.SELECTED_TAB_NAV,
        tabBarInactiveTintColor: Colors.BLACK,
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      {publicScreens.HomeStack}
      {isLoggedIn && (
        <>
          {protectedScreens.NewAds}
          {protectedScreens.BetStack}
          {protectedScreens.Delivery}
        </>
      )}
      {publicScreens.AccountStack}
      {publicScreens.Auth}
      {publicScreens.OnBoarding}
    </RootStack.Navigator>
  );
};
