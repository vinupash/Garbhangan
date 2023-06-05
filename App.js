import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { AuthProvider } from './src/context/AuthContext'
import Navigations from './src/navigations/Navigations'
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './src/constants';

const App = () => {
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setLoading] = useState(false)
  // const isFocused = useIsFocused()
  const BASE_URL = 'https://dev-api.garbhangan.in:5000/';
  // const BASE_URL = 'http://51.77.105.23:81/';

  const checkTokenExpiration = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const tokenRefresh = await AsyncStorage.getItem('refreshToken');
      const transformedAccessToken = JSON.parse(token);
      const transformedRefreshToken = JSON.parse(tokenRefresh);
      console.log('transformedAccessToken--->', transformedAccessToken.accessToken);
      console.log('transformedRefreshToken--->', transformedRefreshToken.refreshToken);
      setRefreshToken(transformedRefreshToken.refreshToken)
      if (transformedAccessToken.accessToken !== null) {
        const decodedToken = jwtDecode(transformedAccessToken.accessToken);
        const currentTime = Date.now() / 1000; // convert to seconds
        if (decodedToken.exp < currentTime) {
          console.log('Access token has expired.');
          newTokeGenerate(refreshToken)
          // Alert.alert(
          //   'Confirmation',
          //   'Access token has expired.',
          //   [
          //     {
          //       text: 'Create new Access token',
          //       onPress: () => newTokeGenerate(refreshToken)
          //     },
          //   ],
          //   { cancelable: false }
          // );
          // perform any necessary action, such as requesting a new access token using the refresh token
        } else {
          console.log('Access token is still valid.');
        }
      } else {
        console.log('Access token not found in async storage.');
      }
    } catch (e) {
      console.log('Error checking access token expiration:', e);
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, [])

  useEffect(() => {
    fetchDataAsync()
  }, [])

  const fetchDataAsync = async () => {
    const currentLanguage = await AsyncStorage.getItem('currentLanguage');
    if (!currentLanguage) {
      // Alert.alert("Unable to fetch mobile number, Login again");
      return;
    }
    const transformedUserLanguage = JSON.parse(currentLanguage);
    // console.log('transformedUserLanguage--->', transformedUserLanguage.currentLanguage);
  };


  const newTokeGenerate = async () => {
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Cookie", refreshToken);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(BASE_URL + "api/auth/refreshtoken", requestOptions);
    const json = await response.json();
    setLoading(false)
    console.log('json App--->', json);
    AsyncStorage.setItem(
      "accessToken",
      JSON.stringify({
        accessTokenStatusUser: 1,
        accessToken: json.data.accessToken,
        // refreshToken: json.data.refreshToken,
      })
    );
    AsyncStorage.setItem(
      "refreshToken",
      JSON.stringify({
        refreshTokenStatusUser: 1,
        refreshToken: json.data.refreshToken,
      })
    );
    return
  }

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    )
  }

  return (
    <AuthProvider>
      <Navigations />
    </AuthProvider>
  )
}

export default App