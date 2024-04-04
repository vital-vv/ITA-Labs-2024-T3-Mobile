import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DeliveryStackParams} from '../../../types/navigation';
import {ROUTES} from '../../../constants/routes';
import {Header} from '../../../components/header/header';
import {DeliveryScreen} from '../../../screens/deliveryScreen/deliveryScreen';
import {DeliveryViewScreen} from '../../../screens/deliveryViewScreen/DeliveryViewScreen';

const DeliveryStack = createNativeStackNavigator<DeliveryStackParams>();

export const DeliveryScreenStack = () => {
  return (
    <DeliveryStack.Navigator initialRouteName={ROUTES.Delivery}>
      <DeliveryStack.Screen
        name={ROUTES.Delivery}
        component={DeliveryScreen}
        options={{
          headerTitle: Header,
        }}
      />
      <DeliveryStack.Screen
        name={ROUTES.DeliveryView}
        component={DeliveryViewScreen}
        options={({route}) => ({title: route.params.headerTitle})}
      />
    </DeliveryStack.Navigator>
  );
};
