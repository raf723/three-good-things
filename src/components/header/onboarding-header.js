import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, Text, Easing, Animated, StyleSheet} from 'react-native';

import {ScaleHook} from 'react-native-design-to-component';

import {useStyle} from '../../hooks/styles';

export const OnboardingHeader = props => {
  const {title, darkMode = true, startProgress, endProgress} = props;

  const {colors, textStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const progressWidth = useRef(new Animated.Value(startProgress)).current;

  // -------------------- EFFECTS -------------------- //
  useEffect(() => {
    Animated.timing(progressWidth, {
      toValue: endProgress,
      duration: 2000,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.exp),
    }).start();
  }, []);

  // -------------------- ACTIONS -------------------- //
  const progressAnim = progressWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  // -------------------- STYLES -------------------- //
  const styles = StyleSheet.create({
    progressBarContainer: {
      height: getHeight(4),
      width: '78%',
    },
    unfilledBar: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      opacity: 0.5,
      borderRadius: radius(12),
      backgroundColor: colors.alabaster,
    },
    filledBar: {
      position: 'absolute',
      height: '100%',
      width: progressAnim,
      borderRadius: radius(12),
      backgroundColor: darkMode ? colors.bistre : colors.isabelline,
    },
    title: {
      ...textStyles.bold32_bistre,
      ...(!darkMode && {
        ...textStyles.bold32_alabaster,
      }),
      textAlign: 'center',
    },
    description: {
      ...textStyles.regular20_bistre,
      textAlign: 'center',
    },
  });

  // -------------------- RENDER -------------------- //
  return (
    <>
      <View style={styles.progressBarContainer}>
        <View style={styles.unfilledBar} />
        <Animated.View style={styles.filledBar} />
      </View>
      <View style={{height: getHeight(24)}} />
      <Text style={styles.title}>{title}</Text>
    </>
  );
};
