import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Alert,
  Platform,
  TextInput,
  UIManager,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {ScaleHook} from 'react-native-design-to-component';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {useStyle} from '../../hooks/styles';
import {emailRegex} from '../../utils/regex';
import {useGlobal} from '../../hooks/global';
import {useLoading} from '../../hooks/loading';
import {dictionary} from '../../hooks/dictionary';

import {DefaultButton} from '../../components/buttons/default-button';

const sigma = require('../../../assets/images/sigma.png');

export const ResetPasswordScreen = () => {
  const {user} = useGlobal();
  const {setLoading} = useLoading();
  const navigation = useNavigation();
  const {colors, textStyles, formStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const {Auth, General} = dictionary;

  const insets = useSafeAreaInsets();
  const topMargin = insets.top + getHeight(48);

  const [password, setPassword] = useState();
  const [codeVerified, setCodeVerified] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState();
  const [verificationCode, setVerificationCode] = useState();

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // -------------------- EFFECTS -------------------- //

  // -------------------- ACTIONS -------------------- //
  // const onPressVerify = () => {
  //   LayoutAnimation.configureNext(
  //     LayoutAnimation.create(
  //       1000,
  //       LayoutAnimation.Types.linear,
  //       LayoutAnimation.Properties.opacity,
  //     ),
  //   );
  //   setCodeVerified(!codeVerified);
  // };

  const onPressChangePassword = () => {
    if (!verificationCode || !password || !confirmPassword) {
      return Alert.alert(General.Error, Auth.EnterRequiredFields);
    }

    if (password?.length < 6) {
      return Alert.alert(General.Error, Auth.InvalidPassword);
    }

    if (password !== confirmPassword) {
      return Alert.alert(General.Error, Auth.PasswordsMustMatch);
    }

    setLoading(true);

    user.confirmPassword(verificationCode, password, {
      onSuccess: res => {
        setLoading(false);

        Alert.alert(General.Success, Auth.PasswordChanged, [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{name: 'login'}],
              });
            },
          },
        ]);
      },

      onFailure: err => {
        setLoading(false);

        Alert.alert(General.Error, err.message);
      },
    });
  };

  // -------------------- FIELDS -------------------- //
  const fields = {
    verificationCode: {
      autoCapitalize: 'none',
      onChange: e => setVerificationCode(e.nativeEvent.text),
      placeholder: Auth.VerificationCode,
      placeholderTextColor: colors.paleSilver,
      value: verificationCode,
    },
    password: {
      autoCapitalize: 'none',
      onChange: e => setPassword(e.nativeEvent.text),
      placeholder: Auth.NewPassword,
      secureTextEntry: true,
      placeholderTextColor: colors.paleSilver,
      value: password,
    },
    confirmPassword: {
      autoCapitalize: 'none',
      onChange: e => setConfirmPassword(e.nativeEvent.text),
      placeholder: Auth.ConfirmNewPassword,
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
      <Text style={styles.title}>{Auth.ResetYourPassword}</Text>
      <View style={{height: getHeight(32)}} />

      {/* Verification code */}
      <TextInput style={styles.input} {...fields.verificationCode} />
      <View style={{height: getHeight(12)}} />

      {/* New password */}
      <TextInput style={styles.input} {...fields.password} />
      <View style={{height: getHeight(12)}} />

      {/* Confirm new password */}
      <TextInput style={styles.input} {...fields.confirmPassword} />
      <View style={{height: getHeight(32)}} />

      {/* Change password button */}
      <DefaultButton
        text={Auth.ChangePassword}
        bgColor={colors.yellowOrange}
        onPress={onPressChangePassword}
      />
    </SafeAreaView>
  );
};
