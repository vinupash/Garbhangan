import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Dimensions, ImageBackground, Image, Animated, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import LogoIcon from '../../../assets/images/LogoIcon';
import BackIcon from '../../../assets/images/BackIcon';
import ChildIcon from '../../../assets/images/ChildIcon';
import { COLORS, SIZES, FONT, SHADOWS, assets } from '../../constants';
import WomenIcon from '../../../assets/images/WomenIcon';
import Pointer from '../../../assets/images/Pointer';
import { BackIconSecton, KidStackSection, WomenStackSection } from '../../components/CustomButtons';
import CustomSwitch from '../../components/CustomSwitch';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import BoardEng from '../../../assets/images/Board-Eng.png'
import BoardHin from '../../../assets/images/Board-Hin.png'
import BoardMar from '../../../assets/images/Board-Mar.png'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotificationApi } from '../../constants/AllApiCall';

const NotificationScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false)
  const iamges = [BoardEng, BoardHin, BoardMar];
  const [indexImage, setIndexImage] = useState(0);
  const [isNotificationTab, setNotificationTab] = useState(1);
  const isFocused = useIsFocused();
  const [isNotifications, setNotifications] = useState([])
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexImage((indexImage + 1) % iamges.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [indexImage]);

  const onSelectSwitch = value => {
    setNotificationTab(value);
  };

  const handleErrorMsg = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: isVisible ? 0 : 1,
        duration: 500,
        useNativeDriver: true
      }
    ).start();
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    fetchDataAsync()
  }, [isFocused])

  const fetchDataAsync = async () => {
    setLoading(true)
    const userData = await AsyncStorage.getItem('userData');
    const token = await AsyncStorage.getItem('accessToken');
    const tokenRefresh = await AsyncStorage.getItem('refreshToken');
    if (!userData && !token && tokenRefresh) {
      // Alert.alert("Unable to fetch mobile number, Login again");
      return;
    }
    const transformedUserData = JSON.parse(userData);
    const transformedAccessToken = JSON.parse(token);
    const anganwadiId = transformedUserData.anganwadiId
    const accessToken = "Bearer " + transformedAccessToken.accessToken
    const resNotificationApi = await getNotificationApi(accessToken)
    setLoading(false)
    // console.log('resNotificationApi', resNotificationApi);
    if (resNotificationApi.IsError == true) {
      handleErrorMsg()
      setErrorMessage(resNotificationApi.message);
      return
    }
    setNotifications(resNotificationApi.data)
  };

  const WomenNotificationsData = () => {
    return isNotifications.map((WomenNotificationsListData, i) => {
      return (
        <View style={{ paddingVertical: 0 }}>
          {
            WomenNotificationsListData.type == 1 ?
              <View key={i} style={{ flexDirection: 'row', marginBottom: 10 }}>
                <SvgXml xml={Pointer} width={32} height={26} style={{ marginRight: 20 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black }}>{WomenNotificationsListData.content}</Text>
                </View>
              </View>
              :
              null
          }
        </View>
      );
    });
  };

  const ChildNotificationsData = () => {
    return isNotifications.map((ChildNotificationsListData, i) => {
      return (
        <View style={{ paddingVertical: 0 }}>
          {ChildNotificationsListData.type == 2 ?
            <View key={i} style={{ flexDirection: 'row', marginBottom: 10 }}>
              <SvgXml xml={Pointer} width={32} height={26} style={{ marginRight: 20 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black }}>{ChildNotificationsListData.content}</Text>
              </View>
            </View> : null}
        </View>
      );
    });
  };


  const WomenNotifications = () => {
    return (
      <>
        {WomenNotificationsData()}
      </>
    )
  }

  const KidNotifications = () => {
    return (
      <>
        {ChildNotificationsData()}
      </>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={COLORS.brand.primary}
      />

      {errorMessage !== '' && (
        <Animated.View style={[styles.snackbar, {
          opacity: fadeAnim
        }]}>
          <Text style={styles.snackbarText}>{errorMessage}</Text>
        </Animated.View>
      )}
      {isLoading ?
        <View style={styles.loading}>
          <ActivityIndicator size='large' color={COLORS.brand.primary} />
        </View>
        : null}

      <ImageBackground
        source={assets.ParkElement}
        style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
      >

        <View style={styles.headerBox}>
          <BackIconSecton
            onPress={() => navigation.goBack()}
            title='Notifications'
          />

          {/* <SvgXml xml={iamges[indexImage]} width={windowWidth >= 960 ? 132 : 120} height={windowWidth >= 960 ? 73 : 63} /> */}
          <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 350 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />
          <View style={styles.menuBox}>
            <CustomSwitch
              selectionMode={1}
              onSelectSwitch={onSelectSwitch}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.notificationBox}
        >

          {isNotificationTab == 1 && <WomenNotifications />}
          {isNotificationTab == 2 && <KidNotifications />}

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brand.background
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth - 30,
    alignSelf: 'center',
    // marginVertical: 10,
    // height: 75,
    marginBottom: 10,
  },
  menuBox: {
    width: windowWidth >= 960 ? 360 : 300,
    alignItems: 'flex-end',
  },
  notificationBox: {
    width: windowWidth - 100,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: '#FFF7EF',
    ...SHADOWS.light,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
    flex: 1
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  snackbar: {
    backgroundColor: '#B71C1C',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    paddingVertical: 10,
    justifyContent: 'center'
  },
  snackbarText: {
    color: '#FFFFFF',
    fontSize: SIZES.medium,
    fontFamily: FONT.MartelSansRegular,
    textAlign: 'center'
  },
})