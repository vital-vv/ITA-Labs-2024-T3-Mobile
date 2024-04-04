import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MyAdsStackParams} from '../../../types/navigation';
import {ROUTES} from '../../../constants/routes';
import {MyAdsScreen} from '../../../screens/myAdsScreen/MyAdsScreen';
import {MyAdViewScreen} from '../../../screens/myAdViewScreen/MyAdViewScreen';

const MyAdsStack = createNativeStackNavigator<MyAdsStackParams>();

export const MyAdsScreenStack = () => {
  return (
    <MyAdsStack.Navigator  initialRouteName={ROUTES.MyAds}>
      <MyAdsStack.Screen
        name={ROUTES.MyAds}
        component={MyAdsScreen}
        options={{title: 'My advertisements'}}
      />
      <MyAdsStack.Screen
        name={ROUTES.MyAdView}
        component={MyAdViewScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
    </MyAdsStack.Navigator>
  );
};
