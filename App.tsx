import {SafeAreaView, StatusBar, View} from 'react-native';
import React from 'react';
import LotList from './screens/LotList/LotList';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <LotList product_subtype="apple" />
      </View>
    </SafeAreaView>
  );
}

export default App;
