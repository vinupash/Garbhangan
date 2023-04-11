import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GarbhaSanskarScreen from '../screens/AppScreen/WomenScreen/GarbhaSanskar/GarbhaSanskarScreen';
import LanguageScreen from '../screens/AppScreen/WomenScreen/GarbhaSanskar/LanguageScreen';
import HindiScreen from '../screens/AppScreen/WomenScreen/GarbhaSanskar/Hindi/HindiScreen';
import MarathiScreen from '../screens/AppScreen/WomenScreen/GarbhaSanskar/Marathi/MarathiScreen';
import EnglishScreen from '../screens/AppScreen/WomenScreen/GarbhaSanskar/English/EnglishScreen';

const Stack = createNativeStackNavigator();

const GarbhaSanskarStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="GarbhaSanskarScreen"
                component={GarbhaSanskarScreen}
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
                name="MarathiScreen"
                component={MarathiScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="HindiScreen"
                component={HindiScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="EnglishScreen"
                component={EnglishScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default GarbhaSanskarStack