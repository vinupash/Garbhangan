import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const BASE_URL = 'https://dev-api.garbhangan.in:5000/';
    // const BASE_URL = 'http://51.77.105.23:81/';


    const UserLoginFun = async (isUserId, isPassword) => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "username": isUserId,
                "password": isPassword
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(BASE_URL + "api/auth/authenticate", requestOptions);
            const json = await response.json();
            console.log('json AuthContext--->', json);
            if (json.isError == false) {
                AsyncStorage.setItem(
                    "userData",
                    JSON.stringify({
                        loginStatusUser: 1,
                        id: json.data.id,
                        roleId: json.data.roleId,
                        anganwadiId: json.data.anganwadiId,
                        username: json.data.username,
                        // accessToken: json.data.accessToken,
                        // refreshToken: json.data.refreshToken,
                    })
                );
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
                // AsyncStorage.setItem('accessToken', json.data.accessToken)
                // AsyncStorage.setItem('refreshToken', json.data.refreshToken)
                setAccessToken(json.data.accessToken)
            } else {
                console.log(json.message)
            }
            return json;
        } catch (error) {
            console.error(error);
        }
    }

    const userLogout = () => {
        setLoading(true)
        setAccessToken(null)
        AsyncStorage.removeItem('userData')
        AsyncStorage.removeItem('accessToken')
        AsyncStorage.removeItem('refreshToken')
        setLoading(false)
    }

    const isUserLogged = async () => {
        try {
            // setLoading(true)
            let userTokan = await AsyncStorage.getItem('accessToken')
            // setLoading(false)
            // setAccessToken(userTokan)
            // console.log('accessToken--->', userTokan);
            const transformedAccessToken = JSON.parse(userTokan);
            // console.log('transformedAccessToken--->', transformedAccessToken.accessToken);
            setAccessToken(transformedAccessToken.accessToken)
        } catch (error) {
            console.log(`isUserLogged in ${error}`);
        }
    }

    useEffect(() => {
        isUserLogged()
    }, [])

    return (
        <AuthContext.Provider value={{
            // userLogin,
            userLogout,
            isLoading,
            accessToken,
            UserLoginFun
        }}>
            {children}
        </AuthContext.Provider>
    )
}