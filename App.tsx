import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import LotList from './screens/LotList/LotList';


function App(): React.JSX.Element {

  return (
    <SafeAreaView >
      <StatusBar />
      <ScrollView>
          <LotList product_subtype='apple'/>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
