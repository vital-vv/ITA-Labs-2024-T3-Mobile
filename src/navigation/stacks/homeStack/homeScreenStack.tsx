import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../../types/navigation';
import {ROUTES} from '../../../constants/routes';
import {HomeScreen} from '../../../screens/homeScreen/homeScreen';
import {SubCategoryScreen} from '../../../screens/subCategoryScreen/subCategoryScreen';
import {LotListScreen} from '../../../screens/LotListScreen/LotListScreen';
import {LotScreen} from '../../../screens/LotScreen/LotScreen';
import {Header} from '../../../components/header/header';
import {VarietyScreen} from '../../../screens/varietyScreen/varietyScreen';

const HomeStack = createNativeStackNavigator<HomeStackParams>();

export const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator initialRouteName={ROUTES.Home}>
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
      <HomeStack.Screen
        name={ROUTES.Variety}
        component={VarietyScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
    </HomeStack.Navigator>
  );
};
