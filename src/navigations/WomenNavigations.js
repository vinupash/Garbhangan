import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WomenScreen from '../screens/AppScreen/WomenScreen/WomenScreen';
import NotificationScreen from '../screens/AppScreen/NotificationScreen';
import NewRegistrationWomen from '../screens/AppScreen/WomenScreen/NewRegistrationWomen';
// import LanguageScreen from '../screens/AppScreen/WomenScreen/GarbhaSanskar/LanguageScreen';
import GarbhaSanskarStack from './GarbhaSanskarStack';

const Stack = createNativeStackNavigator();

const WomenNavigations = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WomenScreen"
                component={WomenScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="NewRegistrationWomen"
                component={NewRegistrationWomen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="GarbhaSanskarStack"
                component={GarbhaSanskarStack}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default WomenNavigations;