import {setupStore} from './src/store';
import {Provider} from 'react-redux';
import {Navigation} from './src/navigation';
import {Amplify} from 'aws-amplify';
import {amplifyConfig} from './src/aws/amplifyConfig';
import {Authenticator} from '@aws-amplify/ui-react-native';
import {MMKWLocaltorage} from './src/utils/localStorage/localStorage';
import {cognitoUserPoolsTokenProvider} from 'aws-amplify/auth/cognito';
import {FC} from 'react';

export const App: FC = () => {
  Amplify.configure(amplifyConfig);
  cognitoUserPoolsTokenProvider.setKeyValueStorage(new MMKWLocaltorage());
  const store = setupStore();

  return (
    <Authenticator.Provider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </Authenticator.Provider>
  );
};
