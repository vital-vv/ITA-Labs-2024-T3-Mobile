import {Navigation} from './src/navigation/navigation';
import {StatusBar} from 'react-native';
import {setupStore} from './src/store';
import {Provider} from 'react-redux';

function App(): React.JSX.Element {
  const store = setupStore();

  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="default" />
        <Navigation />
      </Provider>
    </>
  );
}

export default App;
