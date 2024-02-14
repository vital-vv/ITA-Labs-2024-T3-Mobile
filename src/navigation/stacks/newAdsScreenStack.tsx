import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NewAdsStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import {LotScreen} from '../../screens/LotScreen/LotScreen';
import { NewAdsScreen } from '../../screens/newAdsScreen/newAdsScreen';

const NewAdsStack = createNativeStackNavigator<NewAdsStackParams>();

export const NewAdsScreenStack = () => {
  return (
    <NewAdsStack.Navigator>
      <NewAdsStack.Screen
        name={ROUTES.NewAds}
        component={NewAdsScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
      <NewAdsStack.Screen
        name={ROUTES.Lot}
        component={LotScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
    </NewAdsStack.Navigator>
  );
};
