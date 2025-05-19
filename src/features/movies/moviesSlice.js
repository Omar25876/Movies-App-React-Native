import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moviesService from '../../app/services/moviesService';

// 🔄 Async Thunks
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page = 1, thunkAPI) => {
    try {
      return await moviesService.getPopularMovies(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTopMovies = createAsyncThunk(
  'movies/fetchTopMovies',
  async (page = 1, thunkAPI) => {
    try {
      return await moviesService.getTopMovies(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async (page = 1, thunkAPI) => {
    try {
      return await moviesService.getUpcomingMovies(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchNowPlayingMovies = createAsyncThunk(
  'movies/fetchNowPlayingMovies',
  async (page = 1, thunkAPI) => {
    try {
      return await moviesService.getNowPlayingMovies(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, filter = 'popular', page = 1 }, thunkAPI) => {
    try {
      return await moviesService.searchMovies(query, filter, page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId, thunkAPI) => {
    try {
      return await moviesService.getMovieDetails(movieId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🧠 Initial State
const initialState = {
  popularMovies: [],
  topMovies: [],
  upcomingMovies: [],
  nowPlayingMovies: [],
  movies: [],
  loading: false,
  error: null,
  category: 'popular',
};

// 🧩 Slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    clearMovies(state) {
      state.popularMovies = [];
      state.topMovies = [];
      state.upcomingMovies = [];
      state.nowPlayingMovies = [];
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTopMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.topMovies = action.payload;
      })
      .addCase(fetchTopMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingMovies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.nowPlayingMovies = action.payload;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Optional: Handle movie details storage here
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 🔧 Export Actions + Reducer
export const { setCategory, clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
