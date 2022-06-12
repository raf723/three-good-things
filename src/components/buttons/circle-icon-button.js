import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {ScaleHook} from 'react-native-design-to-component';

import {useStyle} from '../../hooks/styles';

export const CircleIconButton = props => {
  const {icon, onPress} = props;

  const {colors, textStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  // -------------------- EFFECTS -------------------- //

  // -------------------- ACTIONS -------------------- //
  const onPressFinal = () => {
    onPress ? onPress() : null;
  };

  // -------------------- STYLES -------------------- //
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      height: getHeight(40),
      width: getWidth(40),
      borderRadius: radius(20),
      backgroundColor: colors.bistre,
    },
  });

  // -------------------- RENDER -------------------- //
  return (
    <TouchableOpacity style={styles.button} onPress={onPressFinal}>
      <Icon name={icon} size={fontSize(20)} color={colors.alabaster} />
    </TouchableOpacity>
  );
};
