import React, {FC} from 'react';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {AppText} from '../../components/appText/appText';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon';
import {Pressable, View} from 'react-native';
import {styles} from './guestAccountScreenStyles';
import {useAppDispatch} from '../../store/hooks';
import {
  navigateGuestToSignIn,
  navigateGuestToSignUp,
} from '../../store/functions/userActions.ts';

export const GuestAccountScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigateToSignIn = () => dispatch(navigateGuestToSignIn());
  const navigateToSignUp = () => dispatch(navigateGuestToSignUp());

  return (
    <MainWrapper style={styles.wrapper}>
      <View>
        <AppText
          text={'Sign in or create new account to unlock more features:'}
          style={styles.title}
        />
        <ButtonWithIcon title={'Sign in'} onPress={navigateToSignIn} />
        <View style={styles.signUpButton}>
          <Pressable onPress={() => navigateToSignUp()} style={styles.signUp}>
            <AppText text={`Don't have an accout?`} style={styles.signUpText} />
          </Pressable>
        </View>
      </View>
    </MainWrapper>
  );
};
