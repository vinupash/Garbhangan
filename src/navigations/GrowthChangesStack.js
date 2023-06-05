import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GarbhaSanskarScreen from '../screens/AppScreen/WomenScreen/GarbhaSanskar/GarbhaSanskarScreen';
import LanguageScreen from '../screens/AppScreen/WomenScreen/GarbhaSanskar/LanguageScreen';
import HindiScreen from '../screens/AppScreen/WomenScreen/Growth&Changes/Hindi/HindiScreen';
import MarathiScreen from '../screens/AppScreen/WomenScreen/Growth&Changes/Marathi/MarathiScreen';
import EnglishScreen from '../screens/AppScreen/WomenScreen/Growth&Changes/English/EnglishScreen';
import VideoScreen from '../screens/AppScreen/VideoScreen';
import GrowthChangesScreen from '../screens/AppScreen/WomenScreen/Growth&Changes/GrowthChangesScreen';

const Stack = createNativeStackNavigator();

const GrowthChangesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="GrowthChangesScreen"
                component={GrowthChangesScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="GrowthChangesMarathiScreen"
                component={MarathiScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="GrowthChangesHindiScreen"
                component={HindiScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="GrowthChangesEnglishScreen"
                component={EnglishScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="VideoScreenGrowthChanges"
                component={VideoScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default GrowthChangesStack