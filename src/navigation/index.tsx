import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {FC} from 'react';
import {RootStackNavigator} from './stacks/rootStack';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../components/toasts/toastsConfig';
import {navigationRef} from './globalNavigation';
import {useInitializeUserSession} from '../aws/hooks/useInitializeUserSession';
import {Preloader} from '../components/preloader/preloader';

export const Navigation: FC = () => {
  const {isInitializing} = useInitializeUserSession();
  return (
    <>
      <StatusBar barStyle="default" />
      <NavigationContainer ref={navigationRef}>
        {isInitializing ? <Preloader /> : <RootStackNavigator />}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};
