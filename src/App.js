import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {ScaleProvider} from 'react-native-design-to-component';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {StyleProvider} from './hooks/styles';

import {AppContainer} from './containers/app-container';

const App = () => {
  return (
    <SafeAreaProvider>
      <ScaleProvider config={{height: 844, width: 390}}>
        <StyleProvider>
          <NavigationContainer>
            <AppContainer />
          </NavigationContainer>
        </StyleProvider>
      </ScaleProvider>
    </SafeAreaProvider>
  );
};

export default App;
