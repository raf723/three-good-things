import React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {ScaleProvider} from 'react-native-design-to-component';

import {colors} from './hooks/colors';

import Header from './components/Header';

const App = () => {
  return (
    <ScaleProvider config={{height: 844, width: 390}}>
      <SafeAreaView style={styles.background}>
        <Header />
      </SafeAreaView>
    </ScaleProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.isabelline,
  },
});

export default App;
