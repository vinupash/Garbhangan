import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KidScreen from '../screens/AppScreen/KidScreen/KidScreen';

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
        </Stack.Navigator>
    )
}

export default KidNavigations;
