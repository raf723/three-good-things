import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';

import {useStyle} from '../../hooks/styles';
import {dictionary} from '../../hooks/dictionary';

export const Template = () => {
  const {colors, textStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Text>Placeholder</Text>
    </View>
  );
};
