// src/app/navigation/AppNavigator.js
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MainNavigator, MovieStack } from './index';

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="MainTabs" component={MainNavigator} />
            <RootStack.Screen name="MovieStack" component={MovieStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
