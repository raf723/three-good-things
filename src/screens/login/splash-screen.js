import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {ScaleHook} from 'react-native-design-to-component';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useStyle} from '../../hooks/styles';
import {dictionary} from '../../hooks/dictionary';

export const SplashScreen = () => {
  const insets = useSafeAreaInsets();
  const {colors, textStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const {Today} = dictionary;

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.isabelline,
    },
    container: {
      height: getHeight(44) + insets.top,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    title: {
      ...textStyles.semiBold28_bistre,
    },
  });

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{Today}</Text>
      </View>
    </View>
  );
};
