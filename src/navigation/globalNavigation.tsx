import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParams} from '../types/navigation';
export const navigationRef = createNavigationContainerRef<RootStackParams>();

export const globalNavigate = <RouteName extends keyof RootStackParams>(
  ...args: RouteName extends unknown
    ? undefined extends RootStackParams[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: RootStackParams[RouteName]]
      : [screen: RouteName, params: RootStackParams[RouteName]]
    : never
) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
};
