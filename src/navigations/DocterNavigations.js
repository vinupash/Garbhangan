import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DocterScreen from '../screens/AppScreen/DocterScreen/DocterScreen';
import ListofDocterVisit from '../screens/AppScreen/DocterScreen/ListofDocterVisit';
import DocterVisit from '../screens/AppScreen/DocterScreen/DocterVisit';

const Stack = createNativeStackNavigator();

const DocterNavigations = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DocterScreen"
                component={DocterScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ListofDocterVisit"
                component={ListofDocterVisit}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="DocterVisit"
                component={DocterVisit}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default DocterNavigations;
