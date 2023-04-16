import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieObject } from "../types/movieTypes";

interface MoviesState {
  movies: MovieObject[];
}

const initialState: MoviesState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    replaceAllMovies(state, action: PayloadAction<MovieObject[]>) {
      state.movies = action.payload;
    },
    replaceMovie(state, action: PayloadAction<MovieObject>) {
      const movie: MovieObject = action.payload;
      const index = state.movies.findIndex((m) => m._id === movie._id);
      state.movies[index] = movie;
    },
    addMovie(state, action: PayloadAction<MovieObject>) {
      state.movies.push(action.payload);
    },
    deleteMovie(state, action: PayloadAction<string>) {
      const movieId: string = action.payload;
      const index = state.movies.findIndex((m) => m._id === movieId);
      state.movies.splice(index, 1);
    },
    replaceMovies(state, action: PayloadAction<MovieObject[]>) {
      const movies: MovieObject[] = action.payload;
      for (let movie of movies) {
        const index = state.movies.findIndex((m) => m._id === movie._id);
        state.movies[index] = movie;
      }
    },
  },
});

export const movieActions = moviesSlice.actions;

export default moviesSlice;
