import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import { loadFavorites, saveFavorites } from "./favoritesStorage";

const FavoritesScreen = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Reload favorites every time screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        const favorites = await loadFavorites();
        setFavoriteMovies(favorites);
      };
      fetchFavorites();
    }, [])
  );

  const removeFavorite = async (movieId) => {
    const filtered = favoriteMovies.filter((movie) => movie.id !== movieId);
    setFavoriteMovies(filtered);
    await saveFavorites(filtered);
  };

  const renderMovie = ({ item }) => (
    <View style={styles.movieItem}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={styles.poster}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.removeBtn}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {favoriteMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../../assets/favEmpty.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>Your Favourite List is Empty</Text>
          <Text style={styles.emptyText2}>Pick Up Your Favourite Movies</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyText:{
    color: 'gray',
    fontSize:16,
    marginBottom:8,
    fontWeight:'bold'
  },
   emptyText2:{
    color: 'white',
    fontSize:18,
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 6,
  },
  details: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  removeBtn: {
    padding: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:50
  },
  emptyImage: {
    width: 350,
    height: 300,
  },
});

export default FavoritesScreen;
