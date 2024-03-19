import {useAppNavigation} from '../../utils/hooks/useAppNavigation';
import React, {FC} from 'react';
import {ROUTES} from '../../constants/routes';
import {MainWrapper} from '../../components/mainWrapper/mainWrapper';
import {AppText} from '../../components/appText/appText';
import ButtonWithIcon from '../../components/buttons/ButtonWithIcon/ButtonWithIcon';
import {View} from 'react-native';
import {styles} from './guestAccountScreenStyles';

export const GuestAccountScreen: FC = () => {
  const navigation = useAppNavigation();
  const navigateToSignIn = () => {
    navigation.navigate(ROUTES.Auth);
  };

  return (
    <MainWrapper style={styles.wrapper}>
      <View style={styles.items}>
        <AppText
          text={'Sign in to unlock more features'}
          style={styles.title}
        />
        <ButtonWithIcon title={'Sign in'} onPress={() => navigateToSignIn()} />
      </View>
    </MainWrapper>
  );
};
