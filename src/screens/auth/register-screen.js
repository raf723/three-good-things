import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {ScaleHook} from 'react-native-design-to-component';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {useStyle} from '../../hooks/styles';
import {emailRegex} from '../../utils/regex';
import {useLoading} from '../../hooks/loading';
import {dictionary} from '../../hooks/dictionary';
import {cognitoPool} from '../../utils/cognito-pool';

import {DefaultButton} from '../../components/buttons/default-button';
import {OnboardingButton} from '../../components/buttons/onboarding-button';

const sigma = require('../../../assets/images/sigma.png');

export const RegisterScreen = () => {
  const {setLoading} = useLoading();
  const navigation = useNavigation();
  const {colors, textStyles, formStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const {Auth, General} = dictionary;

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
    if (!email || !password || !confirmPassword) {
      return Alert.alert(General.Error, Auth.EnterRequiredFields);
    }

    if (!emailRegex.test(email)) {
      return Alert.alert(General.Error, Auth.InvalidEmail);
    }

    if (password?.length < 6) {
      return Alert.alert(General.Error, Auth.InvalidPassword);
    }

    setLoading(true);

    cognitoPool.signUp(email, password, [], null, (err, data) => {
      setLoading(false);

      if (err) {
        switch (err.name) {
          case 'InvalidParameterException':
            return Alert.alert(General.Error, Auth.InvalidEmail);
          case 'InvalidPasswordException':
            return Alert.alert(General.Error, Auth.InvalidPassword);
          case 'UsernameExistsException':
            return Alert.alert(General.Error, Auth.EmailAlreadyExists);
          default:
            return Alert.alert(General.Error, General.SomethingWentWrong);
        }
      }

      Alert.alert(General.Success, Auth.ConfirmEmail, [
        {text: 'OK', onPress: () => navigation.navigate('login')},
      ]);
    });
  };

  // -------------------- FIELDS -------------------- //
  const fields = {
    email: {
      autoCapitalize: 'none',
      onChange: e => setEmail(e.nativeEvent.text),
      placeholder: Auth.Email,
      placeholderTextColor: colors.paleSilver,
      value: email,
    },
    password: {
      autoCapitalize: 'none',
      onChange: e => setPassword(e.nativeEvent.text),
      placeholder: Auth.Password,
      secureTextEntry: true,
      placeholderTextColor: colors.paleSilver,
      value: password,
    },
    confirmPassword: {
      autoCapitalize: 'none',
      onChange: e => setConfirmPassword(e.nativeEvent.text),
      placeholder: Auth.ConfirmPassword,
      placeholderTextColor: colors.paleSilver,
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
    loginContainer: {
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
      <Text style={styles.title}>{Auth.CreateAccount}</Text>
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
        text={Auth.Register}
        bgColor={colors.yellowOrange}
        onPress={onPressRegister}
      />

      {/* Create account button */}
      <View style={styles.loginContainer}>
        <OnboardingButton
          text={Auth.LoginToAccount}
          darkMode={true}
          arrow={false}
          onPress={onPressLogin}
        />
      </View>
    </SafeAreaView>
  );
};
