import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
const MainStack = createNativeStackNavigator();

import Login from '@app/screens/Login';
import HomeScreen from '@app/screens/HomeScreen';

export const MainStackScreen: FC = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        statusBarTranslucent: true,
        gestureEnabled: false,
      }}>
      <MainStack.Screen name="Login" component={Login} />
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
    </MainStack.Navigator>
  );
};
