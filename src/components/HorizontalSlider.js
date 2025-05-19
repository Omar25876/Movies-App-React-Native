// src/components/HorizontalSlider.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  fetchTopMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
} from "../features/movies/moviesSlice";

const ITEM_WIDTH = 120;
const ITEM_HEIGHT = 180;
const FAVORITES_KEY = "FAVORITE_MOVIES";

const fetchActionsMap = {
  fetchTopMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
};

const HorizontalSlider = ({ title, fetchAction }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (fetchAction && fetchActionsMap[fetchAction]) {
      dispatch(fetchActionsMap[fetchAction]());
    }
  }, [dispatch, fetchAction]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favs !== null) {
        setFavorites(JSON.parse(favs));
      }
    } catch (error) {
      console.error("Error loading favorites", error);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Error saving favorites", error);
    }
  };

  const toggleFavorite = (movie) => {
    let updatedFavorites;
    if (favorites.find((fav) => fav.id === movie.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    saveFavorites(updatedFavorites);
  };

  const movies = useSelector((state) => {
    switch (fetchAction) {
      case "fetchTopMovies":
        return state.movies.topMovies || [];
      case "fetchUpcomingMovies":
        return state.movies.upcomingMovies || [];
      case "fetchNowPlayingMovies":
        return state.movies.nowPlayingMovies || [];
      case "fetchPopularMovies":
        return state.movies.popularMovies || [];
      default:
        return [];
    }
  });

  const handleMoviePress = (movieId) => {
    navigation.navigate("MovieStack", {
      screen: "movie",
      params: { movieId },
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isFav = favorites.some((fav) => fav.id === item.id);
          const releaseYear = item.release_date
            ? new Date(item.release_date).getFullYear()
            : "N/A";

          return (
            <View style={styles.posterContainer}>
              <TouchableOpacity onPress={() => handleMoviePress(item.id)}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.poster}
                />
                <View style={styles.infoContainer}>
                  <Text numberOfLines={1} style={styles.movieTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.movieSubtext}>
                    ⭐ {Math.floor(item.vote_average)}/10 ({item.vote_count})
                  </Text>
                  <Text style={styles.movieSubtext}>📅 {releaseYear}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.favBtn}
                onPress={() => toggleFavorite(item)}
              >
                <Icon name="heart" size={21} color={isFav ? "red" : "white"} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  title: {
    color: "#FFD700",
    fontSize: 18,
    marginVertical: 20,
    marginHorizontal: 8,
    fontWeight: "600",
  },
  posterContainer: {
    marginHorizontal: 10,
    position: "relative",
  },
  poster: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 8,
  },
  favBtn: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    backgroundColor: "#000000aa",
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginTop: 4,
    borderRadius: 6,
    width: ITEM_WIDTH,
  },
  movieTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFD700",
  },
  movieSubtext: {
    fontSize: 11,
    color: "#EEEEEE",
  },
});

export default HorizontalSlider;
