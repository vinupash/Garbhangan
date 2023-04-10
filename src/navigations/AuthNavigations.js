import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/AuthScreen/SplashScreen';
import WelcomeScreen from '../screens/AuthScreen/WelcomeScreen';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import LanguageScreen from '../screens/AuthScreen/LanguageScreen';

const Stack = createNativeStackNavigator();

const AuthNavigations = () => {
    const [isSplashScreen, setSplashScreen] = React.useState(true);
    React.useEffect(() => {
        setInterval(() => {
            setSplashScreen(false)
        }, 4000);
    }, [])

    return (
        <Stack.Navigator>
            {isSplashScreen ?
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{
                        headerShown: false,
                        animation: 'fade'
                    }}
                /> : null
            }
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="LanguageScreen"
                component={LanguageScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigations;