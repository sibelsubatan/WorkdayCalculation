import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {FC, useCallback, useLayoutEffect} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  Alert,
  TextInput,
  ImageBackground,
} from 'react-native';
import {GenericNavigationProps} from '@app/navigation/types';

import theme from '@app/theme';
import * as styles from '@app/styles/LoginStyle';
import {useAppDispatch, useAppSelector} from '@app/hooks/useStoreDispatch';
import {setPassword, setUsername, signInAsync} from '@app/store/user';

const Login: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();

  const {username, password} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useFocusEffect(useCallback(() => {}, []));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const signIn = useCallback(() => {
    if (username && password) {
      dispatch(signInAsync());
    } else {
      Alert.alert('Uyarı', 'Kullanıcı adınızı veya şifrenizi giriniz.');
    }
  }, [dispatch, password, username]);

  return (
    <View style={[theme.flex1]}>
      <ImageBackground
        source={require('@assets/images/ImageBack.png')}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView>
          <View style={styles.inputContain}>
            <View style={theme.marginVertical15}>
              <TextInput
                placeholder="Kullanıcı Adı"
                value={username}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                autoFocus={false}
                onChangeText={text => dispatch(setUsername(text))}
                style={styles.textInputView}
              />
              <TextInput
                placeholder="Şifre"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                autoFocus={false}
                value={password}
                onChangeText={text => dispatch(setPassword(text))}
                style={styles.textInputView}
                secureTextEntry={true}
              />
            </View>

            <Pressable onPress={() => signIn()} style={styles.buttonView}>
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Login;
