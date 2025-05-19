import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

const ITEM_HEIGHT = 180;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchSlider = ({ title, movies }) => {
  const navigate = useNavigation();

  if (!movies || movies.length === 0) return null;

  const handleMoviePress = (movieId) => {
    navigate.navigate("MovieStack", {
      screen: "movie",
      params: { movieId },
    });
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const releaseYear = item.release_date
            ? new Date(item.release_date).getFullYear()
            : "N/A";
          const rating = Math.floor(item.vote_average);
          const voteCount = item.vote_count;

          return (
            <TouchableOpacity onPress={() => handleMoviePress(item.id)}>
              <ImageBackground
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path == null? item.poster_path : item.backdrop_path}`,
                }}
                style={styles.itemContainer}
                imageStyle={styles.backdropImage}
              >
                <View style={styles.overlay} />
                <View style={styles.row}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w200${item.poster_path === null? item.backdrop_path : item.poster_path}`,
                    }}
                    style={styles.poster}
                  />
                  <View style={styles.info}>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                    <Text style={styles.subtext}>⭐ {rating}/10 ({voteCount})</Text>
                    <Text style={styles.subtext}>📅 {releaseYear}</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    width: SCREEN_WIDTH - 20,
    marginHorizontal: 10,
    borderRadius: 14,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  backdropImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
    borderColor: '#fff2',
    borderWidth: 1,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtext: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 2,
  },
});

export default SearchSlider;
