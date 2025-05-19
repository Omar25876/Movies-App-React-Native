import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import moviesService from '../../app/services/moviesService';

const { width } = Dimensions.get('window');

const Movie = () => {
  const route = useRoute();
  const { movieId } = route.params;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await moviesService.getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  const formatCurrency = (num) => {
    return `$${num?.toLocaleString()}`;
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Movie details not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.backdrop}
          source={{ uri: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` }}
        />
        <View style={styles.content}>
          <Image
            style={styles.poster}
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          />
          <View style={styles.textSection}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.subtitle}>Release Date: {movie.release_date}</Text>
            <Text style={styles.subtitle}>Rating: ⭐ {movie.vote_average}</Text>
          </View>
        </View>

        {/* Genres */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.genreContainer}>
            {movie.genres?.map((genre) => (
              <View key={genre.id} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Budget */}
        {movie.budget > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Budget</Text>
            <Text style={styles.detailText}>{formatCurrency(movie.budget)}</Text>
          </View>
        )}

        {/* Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>

        {/* Production Companies */}
        {movie.production_companies?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Production Companies</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {movie.production_companies.map((company) => (
                <View key={company.id} style={styles.companyCard}>
                  {company.logo_path ? (
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w200${company.logo_path}` }}
                      style={styles.companyLogo}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.companyName}>{company.name}</Text>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0D0D0D',
  },
  backdrop: {
    width: width,
    height: 220,
  },
  content: {
    flexDirection: 'row',
    marginTop: -60,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  textSection: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    color: '#DDDDDD',
    lineHeight: 22,
    textAlign: 'justify',
  },
  detailText: {
    fontSize: 16,
    color: '#DDDDDD',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreChip: {
    backgroundColor: '#FFD70020',
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: '#FFD700',
    fontSize: 14,
  },
  companyCard: {
    backgroundColor: '#1A1A1A',
    padding: 10,
    marginRight: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    minWidth: 80,
    marginBottom:50
  },
  companyLogo: {
    width: 60,
    height: 40,
  },
  companyName: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Movie;
