import React, {useState, useEffect, useCallback} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {useLoading} from '../hooks/loading';

import {Playground} from '../screens/playground';

const Stack = createStackNavigator();

export const MainContainer = ({onboarded}) => {
  const {loading} = useLoading();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}>
        <Stack.Screen
          name="playground"
          component={Playground}
          options={{
            headerShown: false,
          }}
        />

        {/* The screens below don't show a tab bar so moving them
          outside the BottomTabContainer fixes this as explained
          in React Navigation docs:
          https://reactnavigation.org/docs/hiding-tabbar-in-screens/ */}
      </Stack.Navigator>
    </>
  );
};
