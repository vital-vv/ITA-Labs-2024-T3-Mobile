import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import {StatusBar} from 'react-native';
import {setupStore} from './src/store';
import {Provider} from 'react-redux';
import {Navigation} from './src/navigation';
import {Amplify} from 'aws-amplify';
import {amplifyConfig} from './src/aws/amplifyConfig';
import { Authenticator } from '@aws-amplify/ui-react-native';

function App(): React.JSX.Element {
  Amplify.configure(amplifyConfig);
  const store = setupStore();

  return (
    <Authenticator.Provider>
      <Provider store={store}>
        <StatusBar barStyle="default" />
        <Navigation />
      </Provider>
    </Authenticator.Provider>
  );
}

export default App;
