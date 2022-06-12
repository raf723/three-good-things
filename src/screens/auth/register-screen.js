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

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const {colors, textStyles, formStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const {
    ConfirmPassword,
    CreateAccount,
    Email,
    Login,
    LoginToAccount,
    Password,
    Register,
  } = dictionary.Auth;

  const insets = useSafeAreaInsets();
  const topMargin = insets.top + getHeight(48);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  // -------------------- EFFECTS -------------------- //

  // -------------------- ACTIONS -------------------- //
  const onPressLogin = () => {
    navigation.goBack();
  };

  const onPressRegister = () => {
    if (!email || !password || !confirmPassword) return;

    console.log('email: ', email);
    console.log('password: ', password);
    console.log('confirmPassword: ', confirmPassword);
  };

  // -------------------- FIELDS -------------------- //
  const fields = {
    email: {
      autoCapitalize: 'none',
      onChange: e => setEmail(e.nativeEvent.text),
      placeholder: Email,
      placeholderTextColor: 'grey',
      value: email,
    },
    password: {
      autoCapitalize: 'none',
      onChange: e => setPassword(e.nativeEvent.text),
      placeholder: Password,
      secureTextEntry: true,
      placeholderTextColor: 'grey',
      value: password,
    },
    confirmPassword: {
      autoCapitalize: 'none',
      onChange: e => setConfirmPassword(e.nativeEvent.text),
      placeholder: ConfirmPassword,
      placeholderTextColor: 'grey',
      secureTextEntry: true,
      value: confirmPassword,
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
      <Text style={styles.title}>{CreateAccount}</Text>
      <View style={{height: getHeight(32)}} />

      {/* Email */}
      <TextInput style={styles.input} {...fields.email}></TextInput>
      <View style={{height: getHeight(12)}} />

      {/* Password */}
      <TextInput style={styles.input} {...fields.password}></TextInput>
      <View style={{height: getHeight(12)}} />

      {/* Confirm password */}
      <TextInput style={styles.input} {...fields.confirmPassword}></TextInput>
      <View style={{height: getHeight(32)}} />

      {/* Register button */}
      <DefaultButton
        text={Register}
        bgColor={colors.yellowOrange}
        onPress={onPressRegister}
      />
      <View style={{height: getHeight(8)}} />

      {/* Create account button */}
      <View style={styles.createAccountContainer}>
        <OnboardingButton
          text={LoginToAccount}
          darkMode={true}
          arrow={false}
          onPress={onPressLogin}
        />
      </View>
    </SafeAreaView>
  );
};
