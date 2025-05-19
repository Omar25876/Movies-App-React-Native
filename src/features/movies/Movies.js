import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import PopularCarousel from "../../components/PopularCarousel";
import HorizontalSlider from "../../components/HorizontalSlider";

const Movies = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PopularCarousel />
        <HorizontalSlider title="Popular Movies" fetchAction="fetchPopularMovies" />
        <HorizontalSlider title="Top Movies" fetchAction="fetchTopMovies" />
        <HorizontalSlider title="Upcoming Movies" fetchAction="fetchUpcomingMovies" />
        <HorizontalSlider title="Now Playing" fetchAction="fetchNowPlayingMovies" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#000",
    paddingTop:39
  },
});

export default Movies;
