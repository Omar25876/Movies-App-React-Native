import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Movie } from '../../features/index';

const Stack = createNativeStackNavigator();

export default function MovieStack() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },  // black background
          headerTintColor: '#FFD700',                 // gold tint color
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="movie"
          component={Movie}
          options={{ title: 'Movie' }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop:39
  },
});
