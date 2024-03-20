import {Authenticator} from '@aws-amplify/ui-react-native';
import {FC} from 'react';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {AppText} from '../../components/appText/appText';
import {Pressable, View} from 'react-native';
import {ROUTES} from '../../constants/routes';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import {Colors} from '../../constants/colors';
import {styles} from './authScreenStyles';
import {useAppNavigation} from '../../utils/hooks/useAppNavigation';

export const AuthScreen: FC = () => {
  const navigation = useAppNavigation();
  const goToHomePage = () => {
    navigation.navigate(ROUTES.HomeStack, {screen: ROUTES.Home});
  };
  return (
    <MainWrapper>
      <Pressable onPress={goToHomePage} style={styles.button}>
        <ArrowLeft fill={Colors.SECONDARY} />
        <AppText text={'Go back to home page'} color={Colors.SECONDARY} />
      </Pressable>
      <Authenticator loginMechanisms={['email']} initialState={'signIn'}>
        <SpinnerWrapper text="Processing..." />
      </Authenticator>
    </MainWrapper>
  );
};
