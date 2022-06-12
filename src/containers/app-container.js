import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {MainContainer} from './main-container';
import {LoginScreen} from '../screens/auth/login-screen';
import {RegisterScreen} from '../screens/auth/register-screen';
import {OnboardingOneScreen} from '../screens/onboarding/onboarding-one-screen';
import {OnboardingTwoScreen} from '../screens/onboarding/onboarding-two-screen';
import {OnboardingFourScreen} from '../screens/onboarding/onboarding-four-screen';
import {OnboardingThreeScreen} from '../screens/onboarding/onboarding-three-screen';

import {Playground} from '../screens/playground';

const Stack = createStackNavigator();

export const AppContainer = ({onboarded}) => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={onboarded ? 'login' : 'onboarding-one'}
        screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
        <Stack.Screen
          name="onboarding-one"
          component={OnboardingOneScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding-two"
          component={OnboardingTwoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding-three"
          component={OnboardingThreeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding-four"
          component={OnboardingFourScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
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
