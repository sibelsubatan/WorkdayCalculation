import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {navigationRef} from '@app/navigation/navigationUtils';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {UserState} from '@app/models/users/users';

const initialState: UserState = {
  username: '',
  password: '',
  userInfo: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any | []>) => {
      state.userInfo = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload.trim();
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload.trim();
    },
    login: (_state, action) => {
      console.log(action);
    },
    logout: state => {
      state.username = '';
      state.password = '';
      toNavigate('Login');
    },
  },
});

export const toNavigate = (screen: string) => {
  navigationRef.navigate(
    screen as never,
    {
      screen: screen,
    } as never,
  );
};
export const signInAsync = createAsyncThunk(
  'user/signInAsync',
  async (_, {dispatch, getState}) => {
    const {
      user: {username, password},
    } = getState() as any;

    try {
      firestore()
        .collection('users')
        .where('username', '==', username)
        .where('password', '==', password)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size > 0) {
            const userList: any[] = [];

            querySnapshot.forEach(doc => {
              userList.push({
                username: doc.data(),
                userId: doc.id,
              });
              dispatch(setUserInfo(userList[0]));
              toNavigate('HomeScreen');
            });
          } else {
            Alert.alert(
              'Uyarı',
              'Kullanıcı adınızı veya şifrenizi kontrol ediniz.',
            );
          }
        })
        .catch(error => {
          console.error('error ', error);
        });
    } catch (error) {
      console.log(error);
    }
  },
);

// Action creators are generated for each case reducer function
export const {login, logout, setUsername, setPassword, setUserInfo} =
  userSlice.actions;

export default userSlice.reducer;
