import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { Movies, Favourites, Settings,Search } from '../../features/index';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="movies"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#000', 
        },
        headerTintColor: '#FFD700',
        drawerStyle: {
          backgroundColor: '#000',
        },
        drawerActiveTintColor: 'gold',
        drawerInactiveTintColor: 'white',
        drawerLabelStyle: {
          fontSize: 16,
        },
        drawerIcon: ({ color }) => {
          let iconName;
          if (route.name === 'movies') iconName = 'movie';
          else if (route.name === 'favourites') iconName = 'favorite';
          else if (route.name === 'search') iconName = 'search';
          // else if (route.name === 'settings') iconName = 'settings';
          return <MaterialIcons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Drawer.Screen name="movies" component={Movies} options={{ title: 'Movies' }} />
      <Drawer.Screen name="search" component={Search} options={{ title: 'Search' }} />
      <Drawer.Screen name="favourites" component={Favourites} options={{ title: 'Favourites' }} />
      {/* <Drawer.Screen name="settings" component={Settings} options={{ title: 'Settings' }} /> */}
    </Drawer.Navigator>
  );
}
