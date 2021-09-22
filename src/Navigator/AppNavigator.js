import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import BroadcastDay from '../BroadcastDay';

const Stack = createNativeStackNavigator();

export default AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Day" component={BroadcastDay} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
