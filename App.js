import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text} from 'react-native';

import TODO from './src/screens/Todo';
import NotFound from './src/screens/NotFound';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TODO"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="TO-DO App" component={TODO} />
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
