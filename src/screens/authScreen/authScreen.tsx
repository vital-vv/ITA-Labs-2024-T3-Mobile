import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react-native';
import {Button} from 'react-native';

export const AuthScreen = () => {
  const {signOut} = useAuthenticator();

  return (
    <Authenticator>
      <Button title="Sign Out" onPress={signOut} />;
    </Authenticator>
  );
};
