import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WomenScreen from '../screens/AppScreen/WomenScreen/WomenScreen';
import NotificationScreen from '../screens/AppScreen/NotificationScreen';
import NewRegistrationWomen from '../screens/AppScreen/WomenScreen/NewRegistrationWomen';
// import LanguageScreen from '../screens/AppScreen/WomenScreen/GarbhaSanskar/LanguageScreen';
import GarbhaSanskarStack from './GarbhaSanskarStack';
import FoodFitnessStack from './FoodFitnessStack';
import ListofWomens from '../screens/AppScreen/WomenScreen/ListofWomens/ListofWomens';
import DetailsView from '../screens/AppScreen/WomenScreen/ListofWomens/DetailsView';
import WomenUpdateProfile from '../screens/AppScreen/WomenScreen/WomenUpdateProfile';
import WomenDoctorCheckup from '../screens/AppScreen/WomenScreen/WomenDoctorCheckup';
import GrowthChangesStack from './GrowthChangesStack';

const Stack = createNativeStackNavigator();

const WomenNavigations = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WomenScreen"
                component={WomenScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="NewRegistrationWomen"
                component={NewRegistrationWomen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="GarbhaSanskarStack"
                component={GarbhaSanskarStack}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="FoodFitnessStack"
                component={FoodFitnessStack}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="GrowthChangesStack"
                component={GrowthChangesStack}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ListofWomens"
                component={ListofWomens}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="DetailsView"
                component={DetailsView}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="WomenUpdateProfile"
                component={WomenUpdateProfile}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="WomenDoctorCheckup"
                component={WomenDoctorCheckup}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default WomenNavigations;