import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/AppScreen/HomeScreen';
import WomenNavigationsStack from './WomenNavigations';
import KidNavigationsStack from './KidNavigations';
import DocterNavigationsStack from './DocterNavigations';

const Stack = createNativeStackNavigator();

const AppNavigations = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="WomenNavigationsStack"
                component={WomenNavigationsStack}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="KidNavigationsStack"
                component={KidNavigationsStack}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="DocterNavigationsStack"
                component={DocterNavigationsStack}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigations;