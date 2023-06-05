import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GarbhaSanskarScreen from '../screens/AppScreen/WomenScreen/GarbhaSanskar/GarbhaSanskarScreen';
import LanguageScreen from '../screens/AppScreen/WomenScreen/GarbhaSanskar/LanguageScreen';
import HindiScreen from '../screens/AppScreen/WomenScreen/Food&Fitness/Hindi/HindiScreen';
import MarathiScreen from '../screens/AppScreen/WomenScreen/Food&Fitness/Marathi/MarathiScreen';
import EnglishScreen from '../screens/AppScreen/WomenScreen/Food&Fitness/English/EnglishScreen';
import VideoScreen from '../screens/AppScreen/VideoScreen';
import FoodFitnessScreen from '../screens/AppScreen/WomenScreen/Food&Fitness/FoodFitnessScreen';

const Stack = createNativeStackNavigator();

const FoodFitnessStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FoodFitnessScreen"
                component={FoodFitnessScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="FoodFitnessMarathiScreen"
                component={MarathiScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="FoodFitnessHindiScreen"
                component={HindiScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="FoodFitnessEnglishScreen"
                component={EnglishScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="VideoScreenFoodFitness"
                component={VideoScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default FoodFitnessStack