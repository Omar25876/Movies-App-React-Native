// src/utils/favoritesStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'FAVORITE_MOVIES';

export const saveFavorites = async (movies) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving favorites', error);
  }
};

export const loadFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favorites', error);
    return [];
  }
};
