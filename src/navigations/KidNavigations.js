import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KidScreen from '../screens/AppScreen/KidScreen/KidScreen';
import NewRegistrationKid from '../screens/AppScreen/KidScreen/NewRegistrationKid';
import LanguageScreen from '../screens/AppScreen/KidScreen/LanguageScreen';
import ListofKids from '../screens/AppScreen/KidScreen/ListofKids/ListofKids';
import DetailsView from '../screens/AppScreen/WomenScreen/ListofWomens/DetailsView';
import DetailsViewKid from '../screens/AppScreen/KidScreen/ListofKids/DetailsViewKid';
import ChildUpdateProfile from '../screens/AppScreen/KidScreen/ChildUpdateProfile';
import ChildDoctorCheckup from '../screens/AppScreen/KidScreen/ChildDoctorCheckup';

const Stack = createNativeStackNavigator();

const KidNavigations = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="KidScreen"
                component={KidScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="NewRegistrationKid"
                component={NewRegistrationKid}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="LanguageScreen"
                component={LanguageScreen}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="ListofKids"
                component={ListofKids}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="DetailsViewKid"
                component={DetailsViewKid}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="ChildUpdateProfile"
                component={ChildUpdateProfile}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="ChildDoctorCheckup"
                component={ChildDoctorCheckup}
                options={{
                    headerShown: false,
                    // animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default KidNavigations;
