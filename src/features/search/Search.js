import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  searchMovies,
  fetchPopularMovies,
  fetchTopMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  setCategory,
} from "../../features/movies/moviesSlice";
import SearchSlider from "../../components/SearchSlider";
import LoadingComponent from "../../components/LoadingComponent";

const FILTERS = [
  { label: "Popular", value: "popular" },
  { label: "Top", value: "top" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Now Playing", value: "now_playing" },
];

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("popular");

  const { movies, loading } = useSelector((state) => state.movies);

  // Grab movies per category from state
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const topMovies = useSelector((state) => state.movies.topMovies);
  const upcomingMovies = useSelector((state) => state.movies.upcomingMovies);
  const nowPlayingMovies = useSelector((state) => state.movies.nowPlayingMovies);

  // Fetch all categories on mount to have data ready for filters
  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchNowPlayingMovies());
  }, [dispatch]);

  // Fetch on search or filter change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim() === "") {
        dispatch(setCategory(filter));
        switch (filter) {
          case "top":
            dispatch(fetchTopMovies());
            break;
          case "upcoming":
            dispatch(fetchUpcomingMovies());
            break;
          case "now_playing":
            dispatch(fetchNowPlayingMovies());
            break;
          case "popular":
          default:
            dispatch(fetchPopularMovies());
            break;
        }
      } else {
        dispatch(searchMovies({ query: search, filter }));
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, filter, dispatch]);

  // Determine movies & title to show when no search according to selected filter
  const getMoviesForFilter = () => {
    switch (filter) {
      case "top":
        return { movies: topMovies, title: "Top Movies" };
      case "upcoming":
        return { movies: upcomingMovies, title: "Upcoming Movies" };
      case "now_playing":
        return { movies: nowPlayingMovies, title: "Now Playing Movies" };
      case "popular":
      default:
        return { movies: popularMovies, title: "Popular Movies" };
    }
  };

  const { movies: filteredMovies, title } = getMoviesForFilter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Search input + filter */}
      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search movies..."
          placeholderTextColor="#999"
          style={styles.input}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FILTERS}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterBtn,
                filter === item.value && styles.activeFilter,
              ]}
              onPress={() => setFilter(item.value)}
            >
              <Text style={styles.filterText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {loading && <LoadingComponent />}

      {!loading && (
        <>
          {search.trim() !== "" ? (
            <SearchSlider
              title={`Results for "${search}"`}
              movies={movies}
            />
          ) : (
            <SearchSlider title={title} movies={filteredMovies} />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
    padding: 18,
  },
  searchContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    color: "#fff",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#222",
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: "#444",
  },
  filterText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Search;
