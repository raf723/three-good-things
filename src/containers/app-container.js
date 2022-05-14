import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainContainer} from './main-container';
import {SplashScreen} from '../screens/login/splash-screen';

const Stack = createNativeStackNavigator();

export const AppContainer = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* <AppStack.Screen
          name="Main"
          component={MainContainer}
          options={{
            headerShown: false,
          }}
        /> */}

        {/* The screens below don't show a tab bar so moving them
        outside the BottomTabContainer fixes this as explained
        in React Navigation docs:
        https://reactnavigation.org/docs/hiding-tabbar-in-screens/ */}
      </Stack.Navigator>
    </>
  );
};