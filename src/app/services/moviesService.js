// src/services/moviesService.js
import axios from 'axios';

const API_KEY = '9813ce01a72ca1bd2ae25f091898b1c7'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

const moviesService = {
  // 🔍 Search Movies by query and category filter
  searchMovies: async (query, filter = 'popular', page = 1) => {
    try {
      let endpoint = '/search/movie';
      let params = {
        query,
        page,
      };

      switch (filter) {
        case 'top':
          endpoint = '/movie/top_rated';
          delete params.query;
          break;
        case 'upcoming':
          endpoint = '/movie/upcoming';
          delete params.query;
          break;
        case 'now_playing':
          endpoint = '/movie/now_playing';
          delete params.query;
          break;
        case 'popular':
        default:
          endpoint = query ? '/search/movie' : '/movie/popular';
          break;
      }

      const response = await axiosInstance.get(endpoint, { params });
      return response.data.results;
    } catch (error) {
      console.error(`Error searching movies with filter "${filter}":`, error);
      throw error;
    }
  },

  // 🎬 Get movie details by ID
  getMovieDetails: async (movieId) => {
    try {
      const response = await axiosInstance.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // 🔥 Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/movie/popular', {
        params: { page },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // ⭐ Get top-rated movies
  getTopMovies: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/movie/top_rated', {
        params: { page },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching top-rated movies:', error);
      throw error;
    }
  },

  // 🎉 Get upcoming movies
  getUpcomingMovies: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/movie/upcoming', {
        params: { page },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  },

  // 🎥 Get now playing movies
  getNowPlayingMovies: async (page = 1) => {
    try {
      const response = await axiosInstance.get('/movie/now_playing', {
        params: { page },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      throw error;
    }
  },
};

// 🎬 Get movie details by ID
getMovieDetails: async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};


export default moviesService;
