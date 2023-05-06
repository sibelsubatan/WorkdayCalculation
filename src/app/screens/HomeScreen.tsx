/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {FC, useCallback, useLayoutEffect, useState} from 'react';
import {Pressable, Text, View, ScrollView, Alert} from 'react-native';
import {GenericNavigationProps} from '@app/navigation/types';
import theme from '@app/theme';
import * as styles from '@app/styles/HomeStyle';
import {useAppDispatch, useAppSelector} from '@app/hooks/useStoreDispatch';
import {logout} from '@app/store/user';
import {LogoutCurve} from 'iconsax-react-native';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {getDatLimit, insertRequest} from '@app/store/home';
import {getAvailableHolidayCount} from '../utils/dateUtils';
import {WorkdayRequest} from '../models/workdays/workday';

const HomeScreen: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const dispatch = useAppDispatch();
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const {userInfo} = useAppSelector(state => state.user);
  const {dayLimitList} = useAppSelector(state => state.home);

  const renderHeaderRight = useCallback(() => {
    return (
      <View style={[theme.marginRight10]}>
        <Pressable
          onPress={() => {
            dispatch(logout());
          }}>
          <LogoutCurve color={theme.BLACK} size={26} />
        </Pressable>
      </View>
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackVisible: false,
      headerTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: 'Anasayfa',
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: theme.LIGHT_GRAY,
      },
      headerRight: renderHeaderRight,
    });
  }, [navigation, dispatch, renderHeaderRight]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getDatLimit(userInfo?.userId));
    }, [dispatch, userInfo]),
  );

  const insert = useCallback(() => {
    if (!(startDate && endDate)) {
      Alert.alert('Uyarı', 'Tarih aralığı seçiniz');
      return;
    }

    if (!(startDate! < endDate!)) {
      Alert.alert('Uyarı', 'Başlangıç tarihi bitiş tarihinden küçük olamaz.');
      return;
    }

    const workDay = getAvailableHolidayCount(startDate!, endDate!);

    if (dayLimitList?.dayLimit < workDay) {
      Alert.alert('Uyarı', 'Yeterli izin bakiyeniz bulunmamaktadır');
      return;
    }

    var addData: WorkdayRequest = {
      username: userInfo?.username?.username,
      userId: userInfo?.userId,
      startDate: dayjs(startDate).format('DD.MM.YYYY'),
      endDate: dayjs(endDate).format('DD.MM.YYYY'),
      workday: workDay,
    };
    dispatch(insertRequest(addData));
  }, [
    dayLimitList,
    dispatch,
    endDate,
    startDate,
    userInfo?.userId,
    userInfo?.username,
  ]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            height: theme.DEVICE_HEIGHT,
            paddingVertical: 30,
          }}>
          <View style={theme.marginBottom10}>
            <View style={theme.paddingHorizontal10}>
              <Text style={styles.titleText}> İzin Başlangıç Tarihi</Text>
            </View>
            <Pressable
              style={styles.textInputView}
              onPress={() => setIsDateVisible(true)}>
              <Text style={styles.dateText}>
                {startDate
                  ? dayjs(startDate).format('DD.MM.YYYY')
                  : 'İzin Başlangıç Tarihi'}
              </Text>
            </Pressable>
          </View>

          <View style={theme.marginBottom10}>
            <View style={theme.paddingHorizontal10}>
              <Text style={styles.titleText}> İzin Bitiş Tarihi</Text>
            </View>
            <Pressable
              style={styles.textInputView}
              onPress={() => setIsEndDateVisible(true)}>
              <Text style={styles.dateText}>
                {endDate
                  ? dayjs(endDate).format('DD.MM.YYYY')
                  : 'İzin Bitiş Tarihi'}
              </Text>
            </Pressable>
          </View>

          <Pressable style={styles.buttonView} onPress={() => insert()}>
            <Text style={styles.buttonText}>İzin Talebini Gönder</Text>
          </Pressable>

          <DatePicker
            modal
            mode="date"
            open={isDateVisible}
            minimumDate={new Date()}
            date={new Date()}
            onConfirm={date => {
              setIsDateVisible(false);
              setStartDate(dayjs(date).toDate());
            }}
            onCancel={() => {
              setIsDateVisible(false);
            }}
            locale="tr"
          />
          <DatePicker
            mode="date"
            modal
            open={isEndDateVisible}
            date={new Date()}
            onConfirm={date => {
              setIsEndDateVisible(false);
              setEndDate(dayjs(date).toDate());
            }}
            onCancel={() => {
              setIsEndDateVisible(false);
            }}
            locale="tr"
            minimumDate={new Date()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
