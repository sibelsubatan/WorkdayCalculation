import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {navigationRef} from '@app/navigation/navigationUtils';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export interface HomeState {
  dayLimitList: any | [];
}

const initialState: HomeState = {
  dayLimitList: [],
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setDayLimitList: (state, action: PayloadAction<any | []>) => {
      state.dayLimitList = action.payload;
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
export const getDatLimit = createAsyncThunk(
  'home/getDatLimit',
  async (id: string, {dispatch, getState}) => {
    const {} = getState() as any;
    try {
      firestore()
        .collection('dayLimit')
        .where('userId', '==', id)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach(doc => {
              dispatch(setDayLimitList(doc.data()));
            });
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
export const insertRequest = createAsyncThunk(
  'home/insertRequest',
  async (d: any, {dispatch, getState}) => {
    const {} = getState() as any;
    try {
      firestore()
        .collection('requests')
        .add({
          username: d.username,
          userId: d.userId,
          startDate: d.startDate,
          endDate: d.endDate,
          workday: d.workday,
        })
        .then(docRef => {
          Alert.alert('', 'İzin talebiniz iletilmişti');
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    } catch (error) {
      console.log(error);
    }
  },
);

// Action creators are generated for each case reducer function
export const {setDayLimitList} = homeSlice.actions;

export default homeSlice.reducer;
