import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-modal';
import {Modalize} from 'react-native-modalize';
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
import {CircleIconButton} from '../../components/buttons/circle-icon-button';

const sigma = require('../../../assets/images/sigma.png');

export const LoginScreen = () => {
  const navigation = useNavigation();
  const {colors, textStyles, formStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const {CreateAccount, Email, Login, LoginToAccount, Password, ResetPassword} =
    dictionary.Auth;

  const insets = useSafeAreaInsets();
  const topMargin = insets.top + getHeight(48);

  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const maxPoint = Dimensions.get('window').height - getHeight(55);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [resetEmail, setResetEmail] = useState();
  const [modalVisible, setModalVisible] = useState(false);

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
    await AsyncStorage.setItem('ONBOARDED', 'false');
  };

  const onPressLogin = () => {
    if (!email || !password) return;

    console.log('email: ', email);
    console.log('password: ', password);
  };

  const onPressResetPassword = () => {
    setModalVisible(true);
  };

  const onPressCloseModal = () => {
    setModalVisible(false);
  };

  const onPressCreateAccount = () => {
    navigation.navigate('register');
  };

  const onPressSendEmail = () => {
    if (!resetEmail) return;

    console.log('resetEmail: ', resetEmail);
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
      placeholderTextColor: 'grey',
      secureTextEntry: true,
      value: password,
    },
    resetEmail: {
      autoCapitalize: 'none',
      onChange: e => setResetEmail(e.nativeEvent.text),
      onFocus: () => bottomSheetRef.current?.open('top'),
      placeholder: Email,
      placeholderTextColor: 'grey',
      value: resetEmail,
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
    modalStyle: {
      paddingTop: getHeight(24),
      paddingHorizontal: getWidth(26),
      backgroundColor: colors.alabaster,
    },
    modalTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    modalTitle: {
      ...textStyles.semiBold24_bistre,
    },
    closeModalButton: {
      alignItems: 'center',
      justifyContent: 'center',
      height: getHeight(40),
      width: getWidth(40),
      borderRadius: radius(20),
      backgroundColor: colors.bistre,
    },
    closeModalIcon: {
      name: 'chevron-down',
      size: fontSize(20),
      color: colors.alabaster,
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
      <DefaultButton
        text={Login}
        onPress={onPressLogin}
        bgColor={colors.yellowOrange}
      />
      <View style={{height: getHeight(8)}} />

      {/* Reset password button */}
      <TouchableOpacity
        onPress={onPressResetPassword}
        style={styles.resetPasswordButton}>
        <Text style={styles.resetPassword}>{ResetPassword}</Text>
      </TouchableOpacity>

      {/* Create account button */}
      <View style={styles.createAccountContainer}>
        <OnboardingButton
          text={CreateAccount}
          darkMode={true}
          arrow={false}
          onPress={onPressCreateAccount}
        />
      </View>

      {/* Reset password bottom sheet */}
      <Modal style={{margin: 0}} isVisible={modalVisible} backdropOpacity={0.6}>
        <Modalize
          ref={bottomSheetRef}
          modalHeight={maxPoint}
          handlePosition={'inside'}
          handleStyle={{height: 0}}
          alwaysOpen={getHeight(240)}
          modalStyle={styles.modalStyle}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{ResetPassword}</Text>
            <CircleIconButton
              icon={'chevron-down'}
              onPress={onPressCloseModal}
            />
          </View>
          <View style={{height: getHeight(24)}} />

          {/* Email */}
          <TextInput style={styles.input} {...fields.resetEmail}></TextInput>
          <View style={{height: getHeight(12)}} />

          {/* Send email button */}
          <DefaultButton
            text={'Send Email'}
            onPress={onPressSendEmail}
            bgColor={colors.yellowOrange}
          />
        </Modalize>
      </Modal>
    </SafeAreaView>
  );
};
