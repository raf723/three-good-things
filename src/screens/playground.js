import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {ScaleHook} from 'react-native-design-to-component';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useStyle} from '../hooks/styles';
import {dictionary} from '../hooks/dictionary';

export const Playground = () => {
  const insets = useSafeAreaInsets();
  const {colors, textStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const {Today} = dictionary;

  // -------------------- EFFECTS -------------------- //
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  // -------------------- STYLES -------------------- //
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.alabaster,
    },
    headerContainer: {
      height: getHeight(44) + insets.top,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    title: {
      ...textStyles.semiBold28_bistre,
    },
  });

  // -------------------- RENDER -------------------- //
  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{Today}</Text>
      </View>
    </View>
  );
};
