import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import theme from '@app/theme';

export const container = {
  height: theme.DEVICE_HEIGHT,
  justifyContent: 'center',
  flex: 1,
  backgroundColor: theme.WHITE,
} as ViewStyle;

export const inputContain = {
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
  width: theme.DEVICE_WIDTH,
  height: theme.DEVICE_HEIGHT,
} as ViewStyle;

export const textInputView = {
  width: theme.DEVICE_WIDTH * 0.8,
  alignSelf: 'center',
  backgroundColor: theme.WHITE,
  marginVertical: 10,
  borderWidth: 1,
  borderColor: theme.BORDER_COLOR,
  minHeight: 50,
  borderRadius: 15,
  paddingHorizontal: 10,
} as ViewStyle;

export const buttonView = {
  width: theme.DEVICE_WIDTH * 0.8,
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor: theme.APPCOLOR,
  marginVertical: 10,
  minHeight: 50,
  borderRadius: 15,
} as ViewStyle;

export const image = {
  flex: 1,
  justifyContent: 'center',
} as ImageStyle;

export const buttonText = {
  color: theme.WHITE,
  alignSelf: 'center',
  fontSize: 16,
  fontWeight: 'bold',
} as TextStyle;
