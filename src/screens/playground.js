import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {ScaleHook} from 'react-native-design-to-component';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useStyle} from '../hooks/styles';
import {dictionary} from '../hooks/dictionary';

import {DefaultButton} from '../components/buttons/default-button';

export const Playground = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {colors, textStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  // -------------------- EFFECTS -------------------- //
  useEffect(() => {}, []);

  // -------------------- ACTIONS -------------------- //
  const onPressLogout = async () => {
    await AsyncStorage.removeItem('REFRESH_TOKEN');

    navigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });
  };

  // -------------------- STYLES -------------------- //
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.alabaster,
    },
    buttonContainer: {
      width: '80%',
    },
  });

  // -------------------- RENDER -------------------- //
  return (
    <View style={styles.background}>
      <View style={styles.buttonContainer}>
        <DefaultButton
          text={'Logout'}
          onPress={onPressLogout}
          bgColor={colors.yellowOrange}
        />
      </View>
    </View>
  );
};
