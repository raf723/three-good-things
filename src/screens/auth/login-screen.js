import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import SplashScreen from 'react-native-splash-screen';
import {useNavigation} from '@react-navigation/native';
import {ScaleHook} from 'react-native-design-to-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {useStyle} from '../../hooks/styles';
import {dictionary} from '../../hooks/dictionary';

import {DefaultButton} from '../../components/buttons/default-button';
import {OnboardingButton} from '../../components/buttons/onboarding-button';

const sigma = require('../../../assets/images/sigma.png');

export const LoginScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {colors, textStyles, formStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const {CreateAccount, Email, Login, LoginToAccount, Password, ResetPassword} =
    dictionary.Auth;

  const topMargin = insets.top + getHeight(48);

  // -------------------- EFFECTS -------------------- //
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  useEffect(() => {
    // setStorage();
  }, []);

  // -------------------- ACTIONS -------------------- //
  const setStorage = async () => {
    await AsyncStorage.setItem('ONBOARDING', 'false');
  };

  // -------------------- FIELDS -------------------- //
  const fields = {
    email: {
      autoCapitalize: 'none',
      placeholder: Email,
    },
    password: {
      autoCapitalize: 'none',
      placeholder: Password,
      secureTextEntry: true,
    },
  };

  // -------------------- STYLES -------------------- //
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: getWidth(40),
      backgroundColor: colors.alabaster,
    },
    logoContainer: {
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      top: topMargin,
    },
    logo: {
      height: getHeight(60),
      aspectRatio: 1,
    },
    createAccountContainer: {
      position: 'absolute',
      top: topMargin,
      right: 0,
    },
    title: {
      ...textStyles.semiBold28_bistre,
      width: '100%',
    },
    input: {
      ...formStyles.textInput,
      ...textStyles.medium16_bistre,
    },
    resetPasswordButton: {
      paddingVertical: getHeight(12),
      paddingHorizontal: getWidth(16),
    },
    resetPassword: {
      ...textStyles.medium16_bistre,
    },
  });

  // -------------------- RENDER -------------------- //
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <FastImage
          style={styles.logo}
          source={sigma}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={{height: getHeight(32)}} />

      {/* Title */}
      <Text style={styles.title}>{LoginToAccount}</Text>
      <View style={{height: getHeight(32)}} />

      {/* Email */}
      <TextInput style={styles.input} {...fields.email}></TextInput>
      <View style={{height: getHeight(12)}} />

      {/* Password */}
      <TextInput style={styles.input} {...fields.password}></TextInput>
      <View style={{height: getHeight(32)}} />

      {/* Login button */}
      <DefaultButton text={Login} bgColor={colors.yellowOrange} />
      <View style={{height: getHeight(8)}} />

      {/* Reset password button */}
      <TouchableOpacity style={styles.resetPasswordButton}>
        <Text style={styles.resetPassword}>{ResetPassword}</Text>
      </TouchableOpacity>

      {/* Create account button */}
      <View style={styles.createAccountContainer}>
        <OnboardingButton text={CreateAccount} darkMode={true} arrow={false} />
      </View>
    </SafeAreaView>
  );
};
