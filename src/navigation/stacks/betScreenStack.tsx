import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BetStackParams} from '../../types/navigation';
import {ROUTES} from '../../constants/routes';
import { BetsScreen } from '../../screens/betsScreen/betsScreen';
import { BetViewScreen } from '../../screens/betViewScreen/BetViewScreen';
import {SubCategoryScreen} from '../../screens/subCategoryScreen/subCategoryScreen';
import {Header} from '../../components/header/header';

const BetStack = createNativeStackNavigator<BetStackParams>();

export const BetScreenStack = () => {
  return (
    <BetStack.Navigator>
      <BetStack.Screen
        name={ROUTES.Bets}
        component={BetsScreen}
        options={{
          headerTitle: Header,
        }}
      />
      <BetStack.Screen
        name={ROUTES.BetView}
        component={BetViewScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />      
    </BetStack.Navigator>
  );
};
