import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../types/navigation';

export const useAppNavigation = () =>
  useNavigation<NavigationProp<RootStackParams>>();
