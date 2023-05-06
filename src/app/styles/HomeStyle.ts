import {TextStyle, ViewStyle} from 'react-native';
import theme from '@app/theme';

export const container = {
  flex: 1,
  backgroundColor: theme.LIGHT_GRAY,
} as ViewStyle;

export const buttonText = {
  color: theme.WHITE,
  alignSelf: 'center',
  fontSize: 16,
  fontWeight: 'bold',
} as TextStyle;

export const titleText = {
  color: theme.BLACK,
  fontSize: 16,
} as TextStyle;

export const dateText = {
  color: theme.BLACK,
  fontSize: 16,
  width: theme.DEVICE_WIDTH * 0.8,
} as TextStyle;

export const buttonView = {
  width: theme.DEVICE_WIDTH * 0.8,
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor: theme.APPCOLOR,
  marginVertical: 10,
  minHeight: 50,
  borderRadius: 15,
} as ViewStyle;

export const textInputView = {
  width: theme.DEVICE_WIDTH * 0.95,
  alignSelf: 'center',
  backgroundColor: 'transparent',
  marginVertical: 10,
  borderWidth: 1,
  borderColor: theme.BORDER_COLOR,
  minHeight: 50,
  borderRadius: 15,
  paddingHorizontal: 10,
  justifyContent: 'center',
} as ViewStyle;
