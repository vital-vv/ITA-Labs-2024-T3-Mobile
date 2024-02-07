import {HomeScreen} from '../screens/homeScreen/homeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SubCategoryScreen} from '../screens/subCategoryScreen/subCategoryScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DeliveryScreen} from '../screens/deliveryScreen/deliveryScreen';
import {BetsScreen} from '../screens/betsScreen/betsScreen';
import {NewAdsScreen} from '../screens/newAdsScreen/newAdsScreen';
import {AccountScreen} from '../screens/accountScreen/accountScreen';
import {LotListScreen} from '../screens/LotListScreen/LotListScreen';
import {Colors} from '../constants/colors';
import {ROUTES} from '../constants/routes';
import {HomeStackParams, RootStackParams} from '../types/navigation';
import HomeIcon from '../assets/icons/bottomTabNavIcons/home.svg';
import BettingIcon from '../assets/icons/bottomTabNavIcons/auction.svg';
import NewAds from '../assets/icons/bottomTabNavIcons/plus-square.svg';
import DeliveryIcon from '../assets/icons/bottomTabNavIcons/truck.svg';
import AccountIcon from '../assets/icons/bottomTabNavIcons/account.svg';
import {LotScreen} from '../screens/LotScreen/LotScreen';
import {Header} from '../components/header/header';

const RootStack = createBottomTabNavigator<RootStackParams>();
const HomeStack = createNativeStackNavigator<HomeStackParams>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={ROUTES.Home}
        component={HomeScreen}
        options={{
          headerTitle: Header,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.SubCategory}
        component={SubCategoryScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
      <HomeStack.Screen
        name={ROUTES.LotList}
        component={LotListScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
      <HomeStack.Screen
        name={ROUTES.Lot}
        component={LotScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
    </HomeStack.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
