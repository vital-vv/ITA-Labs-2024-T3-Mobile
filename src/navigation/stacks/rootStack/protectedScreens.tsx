import {RootStack} from '.';
import {ROUTES} from '../../../constants/routes';
import {DeliveryScreen} from '../../../screens/deliveryScreen/deliveryScreen';
import {NewAdsScreen} from '../../../screens/newAdsScreen/newAdsScreen';
import BettingIcon from '../../../assets/icons/bottomTabNavIcons/auction.svg';
import NewAds from '../../../assets/icons/bottomTabNavIcons/plus-square.svg';
import DeliveryIcon from '../../../assets/icons/bottomTabNavIcons/truck.svg';
import {BetScreenStack} from '../betStack/betScreenStack';
import {Header} from '../../../components/header/header';

export const protectedScreens = {
  [ROUTES.NewAds]: (
    <RootStack.Screen
      name={ROUTES.NewAds}
      component={NewAdsScreen}
      options={{
        tabBarIcon: ({color}) => <NewAds fill={`${color}`} />,
      }}
    />
  ),
  [ROUTES.BetStack]: (
    <RootStack.Screen
      name={ROUTES.BetStack}
      component={BetScreenStack}
      options={{
        tabBarIcon: ({color}) => <BettingIcon fill={`${color}`} />,
      }}
    />
  ),
  [ROUTES.Delivery]: (
    <RootStack.Screen
      name={ROUTES.Delivery}
      component={DeliveryScreen}
      options={{
        headerShown: true,
        headerTitle: Header,
        tabBarIcon: ({color}) => <DeliveryIcon fill={`${color}`} />,
      }}
    />
  ),
};
