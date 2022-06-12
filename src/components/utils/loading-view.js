import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {ScaleHook} from 'react-native-design-to-component';

import {useStyle} from '../../hooks/styles';

export const LoadingView = props => {
  const {colors, textStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  // -------------------- EFFECTS -------------------- //

  // -------------------- ACTIONS -------------------- //

  // -------------------- STYLES -------------------- //
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      height: getHeight(50),
      width: getWidth(50),
      alignSelf: 'center',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      top: '50%',
      opacity: 0.5,
      backgroundColor: 'black',
      borderRadius: radius(16),
      paddingVertical: getHeight(40),
      paddingHorizontal: getWidth(40),
    },
  });

  // -------------------- RENDER -------------------- //
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.alabaster} />
    </View>
  );
};
