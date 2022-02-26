import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';

import {colors} from '../hooks/colors';

const Header = () => {
  const {getHeight, getWidth, fontSize} = ScaleHook();

  const styles = {
    container: {
      height: getHeight(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: fontSize(20),
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today</Text>
    </View>
  );
};

export default Header;
