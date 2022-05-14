import {Platform} from 'react-native';

export const fonts = {
  black: Platform.select({
    ios: 'Playfair Display Black',
    android: 'PlayfairDisplay-Black',
  }),
  bold: Platform.select({
    ios: 'Playfair Display Bold',
    android: 'PlayfairDisplay-Bold',
  }),
  extraBold: Platform.select({
    ios: 'Playfair Display ExtraBold',
    android: 'PlayfairDisplay-ExtraBold',
  }),
  medium: Platform.select({
    ios: 'Playfair Display Medium',
    android: 'PlayfairDisplay-Medium',
  }),
  regular: Platform.select({
    ios: 'Playfair Display Regular',
    android: 'PlayfairDisplay-Regular',
  }),
  semiBold: Platform.select({
    ios: 'Playfair Display SemiBold',
    android: 'PlayfairDisplay-SemiBold',
  }),
};
