import React, { useContext } from 'react'
import { ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigations from './AppNavigations'
import AuthNavigations from './AuthNavigations'
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../constants';

const Navigations = () => {
    const { accessToken, isLoading } = useContext(AuthContext)
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            backgroundColor: 'transparent'
        }
    }
    // if (isLoading) {
    //     return (
    //         <ActivityIndicator size="large" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    //     )
    // }
    return (
        <NavigationContainer theme={theme} independent={true}>
            {/* {userLoginStatus === true ? <AppNavigations /> : <AuthNavigations />} */}
            {/* <AppNavigations /> */}
            {/* <AuthNavigations /> */}
            {accessToken ? <AppNavigations /> : <AuthNavigations />}
        </NavigationContainer>
    )
}

export default Navigations;
