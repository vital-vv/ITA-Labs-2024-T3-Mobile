import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react-native';
import {FC, useEffect} from 'react';
import {SpinnerWrapper} from '../../components/spinnerWrapper/spinnerWrapper';
import {AppText} from '../../components/appText/appText';
import {Pressable} from 'react-native';
import {ROUTES} from '../../constants/routes';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import {Colors} from '../../constants/colors';
import {styles} from './authScreenStyles';
import {globalNavigate} from '../../navigation/globalNavigation';
import {AuthStatuses} from '../../types/auth';
import {useAuthUIHandler} from '../../aws/hooks/useAuthUIHandler.tsx';

export const AuthScreen: FC = () => {
  const {isTransitionInProgress} = useAuthUIHandler();
  const goToHomePage = () => {
    globalNavigate(ROUTES.HomeStack, {screen: ROUTES.Home});
  };
  return (
    <MainWrapper>
      {isTransitionInProgress && (
        <MainWrapper style={styles.loading}>
          <SpinnerWrapper text="Processing..." />
        </MainWrapper>
      )}
      <Pressable onPress={goToHomePage} style={styles.button}>
        <ArrowLeft fill={Colors.SECONDARY} />
        <AppText text={'Go back to home page'} color={Colors.SECONDARY} />
      </Pressable>
      <Authenticator
        loginMechanisms={['email']}
        initialState={AuthStatuses.SignIn}>
        <SpinnerWrapper text="Processing..." />
      </Authenticator>
    </MainWrapper>
  );
};
