import React, {useMemo, useContext, createContext} from 'react';
import {View} from 'react-native';

import {ScaleHook} from 'react-native-design-to-component';

import {fonts} from './fonts';
import {colors} from './colors';

const StyleContext = createContext(null);

export const useStyle = () => {
  const context = useContext(StyleContext);
  return context;
};

export const StyleProvider = ({children}) => {
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  // ** ** ** ** ** TEXT STYLES ** ** ** ** **
  const textStyles = {
    semiBold28_bistre: {
      color: colors.bistre,
      fontFamily: fonts.semiBold,
      fontSize: fontSize(28),
    },
    semiBold28_yellowOrange: {
      color: colors.yellowOrange,
      fontFamily: fonts.semiBold,
      fontSize: fontSize(28),
    },
  };

  // ** ** ** ** ** MEMOIZE ** ** ** ** **
  const values = useMemo(() => ({colors, textStyles}), [colors, textStyles]);

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={{flex: 1}}>
      <StyleContext.Provider value={values}>{children}</StyleContext.Provider>
    </View>
  );
};
