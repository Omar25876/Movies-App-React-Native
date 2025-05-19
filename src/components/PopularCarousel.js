import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../features/movies/moviesSlice';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PopularCarousel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { popularMovies } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  const extractYear = (date) => {
    return date ? new Date(date).getFullYear() : 'N/A';
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={250}
        autoPlay={true}
        data={popularMovies}
        scrollAnimationDuration={3000}
        renderItem={({ index }) => {
          const item = popularMovies[index];
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Movie', { movieId: item.id })}
              style={styles.slide}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w780${item.backdrop_path === null? item.poster_path :item.backdrop_path}` }}
                style={styles.backdrop}
              />
              <View style={styles.overlay}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path === null?  item.backdrop_path :  item.poster_path}` }}
                  style={styles.poster}
                />
                <View style={styles.textContainer}>
                  <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtext}>📅 {extractYear(item.release_date)}</Text>
                  <Text style={styles.subtext}>⭐ {Math.round(item.vote_average)}/10  ({item.vote_count} Votes)</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  slide: {
    position: 'relative',
    width: width,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  overlay: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    bottom: 15,
    left: 15,
    right: 15,
    padding: 10,
    backgroundColor: '#00000099',
    borderRadius: 15,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  subtext: {
    fontSize: 13,
    color: '#EEEEEE',
  },
});

export default PopularCarousel;
