import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {ScaleHook} from 'react-native-design-to-component';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useStyle} from '../../hooks/styles';
import {dictionary} from '../../hooks/dictionary';

const splashImage = require('../../../assets/images/splashImage.png');

export const LaunchScreen = () => {
  const insets = useSafeAreaInsets();
  const {colors, textStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const {Today} = dictionary;

  const imageFade = useRef(new Animated.Value(0)).current;
  const imageMovement = useRef(new Animated.Value(0)).current;

  // -------------------- EFFECTS -------------------- //
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  useEffect(() => {
    Animated.timing(imageFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(imageMovement, {
        toValue: -250,
        duration: 2000,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: true,
      }).start();
    }, 2250);
  }, []);

  // -------------------- STYLES -------------------- //
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.alabaster,
    },
    image: {
      height: getHeight(120),
      aspectRatio: 1.5,
      opacity: imageFade,
      transform: [{translateY: imageMovement}],
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
    <View style={styles.container}>
      <Animated.Image source={splashImage} style={styles.image} />
    </View>
  );
};
