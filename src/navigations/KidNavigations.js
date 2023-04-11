import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KidScreen from '../screens/AppScreen/KidScreen/KidScreen';
import NewRegistrationKid from '../screens/AppScreen/KidScreen/NewRegistrationKid';
import LanguageScreen from '../screens/AppScreen/KidScreen/LanguageScreen';

const Stack = createNativeStackNavigator();

const KidNavigations = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="KidScreen"
                component={KidScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="NewRegistrationKid"
                component={NewRegistrationKid}
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
        </Stack.Navigator>
    )
}

export default KidNavigations;
