import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {FC} from 'react';
import {RootStackNavigator} from './stacks/rootStack';
import {Preloader} from '../components/preloader/preloader';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../components/toasts/toastsConfig';
import {useInitializeUserSession} from '../aws/hooks/useInitializeUserSession';
import {navigationRef} from './globalNavigation';

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
