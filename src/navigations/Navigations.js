import React, { useContext } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigations from './AppNavigations'
import AuthNavigations from './AuthNavigations'
import { AuthContext } from '../context/AuthContext';

const Navigations = () => {
    const { userTokan } = useContext(AuthContext)
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            backgroundColor: 'transparent'
        }
    }
    return (
        <NavigationContainer theme={theme} independent={true}>
            {/* {userLoginStatus === true ? <AppNavigations /> : <AuthNavigations />} */}
            {/* <AppNavigations /> */}
            {/* <AuthNavigations /> */}
            {userTokan ? <AppNavigations /> : <AuthNavigations />}
        </NavigationContainer>
    )
}

export default Navigations;
