import {SafeAreaView, StatusBar, View} from 'react-native';
import React from 'react';
import LotList from './screens/LotList/LotList';
import LotViewScreen from './screens/LotView/LotView';
        
function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <LotList product_subtype="apple" />
      </View>
      <LotViewScreen />
    </SafeAreaView>
  );
}

export default App;
