import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import LotViewScreen from './screens/LotView/LotView';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <LotViewScreen />
    </SafeAreaView>
  );
}

export default App;
