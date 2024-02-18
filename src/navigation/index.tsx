import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DeliveryScreen} from '../screens/deliveryScreen/deliveryScreen';
import {BetsScreen} from '../screens/betsScreen/betsScreen';
import {NewAdsScreen} from '../screens/newAdsScreen/newAdsScreen';
import {AccountScreen} from '../screens/accountScreen/accountScreen';
import {Colors} from '../constants/colors';
import {ROUTES} from '../constants/routes';
import {RootStackParams} from '../types/navigation';
import HomeIcon from '../assets/icons/bottomTabNavIcons/home.svg';
import BettingIcon from '../assets/icons/bottomTabNavIcons/auction.svg';
import NewAds from '../assets/icons/bottomTabNavIcons/plus-square.svg';
import DeliveryIcon from '../assets/icons/bottomTabNavIcons/truck.svg';
import AccountIcon from '../assets/icons/bottomTabNavIcons/account.svg';
import {HomeScreenStack} from './stacks/homeScreenStack';
import {OnBoardingScreen} from '../screens/onBoardingScreen/onBoardingScreen';
import {useAppSelector} from '../store/hooks';
import {selector} from '../store/selector';

const RootStack = createBottomTabNavigator<RootStackParams>();

export const Navigation = () => {
  const {isOnboarded} = useAppSelector(selector.currentUserSliceData);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={isOnboarded ? ROUTES.HomeStack : ROUTES.OnBoarding}
        screenOptions={{
          tabBarActiveTintColor: Colors.SELECTED_TAB_NAV,
          tabBarInactiveTintColor: Colors.BLACK,
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <RootStack.Screen
          name={ROUTES.HomeStack}
          component={HomeScreenStack}
          options={{
            tabBarIcon: ({color}) => <HomeIcon fill={`${color}`} />,
          }}
        />
        <RootStack.Screen
          name={ROUTES.NewAds}
          component={NewAdsScreen}
          options={{
            tabBarIcon: ({color}) => <NewAds fill={`${color}`} />,
          }}
        />
        <RootStack.Screen
          name={ROUTES.Bets}
          component={BetsScreen}
          options={{
            tabBarIcon: ({color}) => <BettingIcon fill={`${color}`} />,
          }}
        />
        <RootStack.Screen
          name={ROUTES.Delivery}
          component={DeliveryScreen}
          options={{
            tabBarIcon: ({color}) => <DeliveryIcon fill={`${color}`} />,
          }}
        />
        <RootStack.Screen
          name={ROUTES.Account}
          component={AccountScreen}
          options={{
            tabBarIcon: ({color}) => <AccountIcon fill={`${color}`} />,
          }}
        />
        <RootStack.Screen
          name={ROUTES.OnBoarding}
          component={OnBoardingScreen}
          options={{
            tabBarButton: () => null,
            tabBarStyle: {display: 'none'},
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
