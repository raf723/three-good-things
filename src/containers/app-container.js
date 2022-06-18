import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {useLoading} from '../hooks/loading';

import {MainContainer} from './main-container';
import {LoginScreen} from '../screens/auth/login-screen';
import {RegisterScreen} from '../screens/auth/register-screen';
import {ResetPasswordScreen} from '../screens/auth/reset-password-screen';
import {OnboardingOneScreen} from '../screens/onboarding/onboarding-one-screen';
import {OnboardingTwoScreen} from '../screens/onboarding/onboarding-two-screen';
import {OnboardingFourScreen} from '../screens/onboarding/onboarding-four-screen';
import {OnboardingThreeScreen} from '../screens/onboarding/onboarding-three-screen';

import {Playground} from '../screens/playground';
import {LoadingView} from '../components/utils/loading-view';

const Stack = createStackNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const AppContainer = ({onboarded}) => {
  const {loading} = useLoading();

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
        <Stack.Screen
          name="reset-password"
          component={ResetPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="main"
          component={MainContainer}
          options={{
            cardStyleInterpolator: forFade,
            headerShown: false,
          }}
        />

        {/* The screens below don't show a tab bar so moving them
          outside the BottomTabContainer fixes this as explained
          in React Navigation docs:
          https://reactnavigation.org/docs/hiding-tabbar-in-screens/ */}
      </Stack.Navigator>
      {loading && <LoadingView />}
    </>
  );
};
