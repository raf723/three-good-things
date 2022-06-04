import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {ScaleHook} from 'react-native-design-to-component';

import {useStyle} from '../../hooks/styles';

export const DefaultButton = props => {
  const {text, bgColor, onPress} = props;

  const {colors, textStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  // -------------------- EFFECTS -------------------- //

  // -------------------- ACTIONS -------------------- //
  const onPressFinal = () => {
    onPress ? () => onPress() : null;
  };

  // -------------------- STYLES -------------------- //
  const styles = StyleSheet.create({
    button: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: bgColor,
      borderRadius: radius(8),
      paddingLeft: getWidth(16),
      paddingRight: getWidth(24),
      paddingVertical: getHeight(8),
    },
    buttonText: {
      ...textStyles.semiBold20_bistre,
      paddingBottom: getHeight(4),
    },
  });

  // -------------------- RENDER -------------------- //
  return (
    <TouchableOpacity style={styles.button} onPress={onPressFinal}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
