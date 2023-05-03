import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/AppScreen/HomeScreen';
import WomenNavigationsStack from './WomenNavigations';
import KidNavigationsStack from './KidNavigations';

const Stack = createNativeStackNavigator();

const AppNavigations = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="WomenNavigationsStack"
                component={WomenNavigationsStack}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="KidNavigationsStack"
                component={KidNavigationsStack}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigations;