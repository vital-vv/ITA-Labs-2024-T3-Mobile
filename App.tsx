import {StatusBar} from 'react-native';
import {setupStore} from './src/store';
import {Provider} from 'react-redux';
import {Navigation} from './src/navigation';

function App(): React.JSX.Element {
  const store = setupStore();

  return (
    <Provider store={store}>
      <StatusBar barStyle="default" />
      <Navigation />
    </Provider>
  );
}

export default App;
