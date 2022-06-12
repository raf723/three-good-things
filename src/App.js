import React, {useState, useEffect, useCallback} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {ScaleProvider} from 'react-native-design-to-component';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {StyleProvider} from './hooks/styles';
import {LoadingProvider} from './hooks/loading';

import {AppContainer} from './containers/app-container';

const App = () => {
  const [onboarded, setOnboarded] = useState();

  // -------------------- EFFECTS -------------------- //
  useEffect(() => {
    getStorage();
  }, []);

  // -------------------- ACTIONS -------------------- //
  const getStorage = async () => {
    const onboarded = await AsyncStorage.getItem('ONBOARDED');
    setOnboarded(JSON.parse(onboarded));
  };

  // -------------------- RENDER -------------------- //
  return (
    <SafeAreaProvider>
      <ScaleProvider config={{height: 844, width: 390}}>
        <StyleProvider>
          <NavigationContainer>
            <LoadingProvider>
              <AppContainer onboarded={onboarded} />
            </LoadingProvider>
          </NavigationContainer>
        </StyleProvider>
      </ScaleProvider>
    </SafeAreaProvider>
  );
};

export default App;
