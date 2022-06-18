import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  Alert,
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
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {useStyle} from '../../hooks/styles';
import {emailRegex} from '../../utils/regex';
import {useGlobal} from '../../hooks/global';
import {useLoading} from '../../hooks/loading';
import {dictionary} from '../../hooks/dictionary';
import {cognitoPool} from '../../utils/cognito-pool';

import {DefaultButton} from '../../components/buttons/default-button';
import {OnboardingButton} from '../../components/buttons/onboarding-button';
import {CircleIconButton} from '../../components/buttons/circle-icon-button';

const sigma = require('../../../assets/images/sigma.png');

export const LoginScreen = () => {
  const {setUser} = useGlobal();
  const {setLoading} = useLoading();
  const navigation = useNavigation();
  const {colors, textStyles, formStyles} = useStyle();
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const {Auth, General} = dictionary;

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
    getSession();
  }, []);

  // -------------------- ACTIONS -------------------- //
  const setStorage = async () => {
    await AsyncStorage.setItem('ONBOARDED', 'false');
  };

  const resetForm = () => {
    setEmail();
    setPassword();
    setResetEmail();
  };

  const onPressLogin = () => {
    if (!email || !password) {
      return Alert.alert(General.Error, Auth.EnterRequiredFields);
    }

    if (!emailRegex.test(email) || password?.length < 6) {
      return Alert.alert(General.Error, Auth.InvalidCredentials);
    }

    const user = new CognitoUser({
      Username: email,
      Pool: cognitoPool,
    });
    setUser(user);

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    setLoading(true);
    user.authenticateUser(authDetails, {
      onSuccess: async res => {
        resetForm();
        setLoading(false);

        const token = res?.refreshToken?.token;
        await AsyncStorage.setItem('REFRESH_TOKEN', token);

        setTimeout(() => {
          navigation.navigate('main');
        }, 350);
      },

      onFailure: err => {
        setLoading(false);

        switch (err.name) {
          case 'UserNotConfirmedException':
            return Alert.alert(General.Error, Auth.UserNotConfirmed);
          case 'NotAuthorizedException':
            return Alert.alert(General.Error, Auth.IncorrectCredentials);
          default:
            return Alert.alert(General.Error, General.SomethingWentWrong);
        }
      },
    });
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
    if (!resetEmail) {
      return Alert.alert(General.Error, Auth.EnterRequiredFields);
    }

    if (!emailRegex.test(resetEmail)) {
      return Alert.alert(General.Error, Auth.InvalidEmail);
    }

    const user = new CognitoUser({
      Username: resetEmail,
      Pool: cognitoPool,
    });
    setUser(user);

    user.forgotPassword({
      onSuccess: res => {
        Alert.alert(General.Success, Auth.ResetEmailSent, [
          {
            text: 'OK',
            onPress: () => {
              setModalVisible(false);
              setTimeout(() => {
                navigation.navigate('reset-password');
              }, 500);
            },
          },
        ]);
      },
      onFailure: err => {
        Alert.alert(General.Error, General.SomethingWentWrong, [{text: 'OK'}]);
      },
    });
  };

  const getSession = useCallback(async () => {
    const storageToken = await AsyncStorage.getItem('REFRESH_TOKEN');

    cognitoPool.storage.sync(function (err, res) {
      if (res !== 'SUCCESS') return;

      const user = cognitoPool.getCurrentUser();
      if (!user) return;

      user.getSession((err, session) => {
        if (err) return;

        const sessionToken = session?.refreshToken?.token;
        if (sessionToken === storageToken) navigation.navigate('main');
      });
    });
  }, []);

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
      placeholderTextColor: colors.paleSilver,
      secureTextEntry: true,
      value: password,
    },
    resetEmail: {
      autoCapitalize: 'none',
      onChange: e => setResetEmail(e.nativeEvent.text),
      onFocus: () => bottomSheetRef.current?.open('top'),
      placeholder: Auth.Email,
      placeholderTextColor: colors.paleSilver,
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
      <Text style={styles.title}>{Auth.LoginToAccount}</Text>
      <View style={{height: getHeight(32)}} />

      {/* Email */}
      <TextInput style={styles.input} {...fields.email}></TextInput>
      <View style={{height: getHeight(12)}} />

      {/* Password */}
      <TextInput style={styles.input} {...fields.password}></TextInput>
      <View style={{height: getHeight(32)}} />

      {/* Login button */}
      <DefaultButton
        text={Auth.Login}
        onPress={onPressLogin}
        bgColor={colors.yellowOrange}
      />
      <View style={{height: getHeight(8)}} />

      {/* Reset password button */}
      <TouchableOpacity
        onPress={onPressResetPassword}
        style={styles.resetPasswordButton}>
        <Text style={styles.resetPassword}>{Auth.ResetPassword}</Text>
      </TouchableOpacity>

      {/* Create account button */}
      <View style={styles.createAccountContainer}>
        <OnboardingButton
          text={Auth.CreateAccount}
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
          alwaysOpen={getHeight(256)}
          modalStyle={styles.modalStyle}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{Auth.ResetPassword}</Text>
            <CircleIconButton
              icon={'chevron-down'}
              onPress={onPressCloseModal}
            />
          </View>
          <View style={{height: getHeight(32)}} />

          {/* Email */}
          <TextInput style={styles.input} {...fields.resetEmail}></TextInput>
          <View style={{height: getHeight(20)}} />

          {/* Send email button */}
          <DefaultButton
            text={Auth.SendEmail}
            onPress={onPressSendEmail}
            bgColor={colors.yellowOrange}
          />
        </Modalize>
      </Modal>
    </SafeAreaView>
  );
};
