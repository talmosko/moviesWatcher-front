import axios from "axios";
import { MovieObject } from "../types/movieTypes";
import { movieActions } from "./movies-slice";
import { errorsActions } from "./errors-slice";

export const getAllMovies = () => {
  return async function (dispatch: any) {
    try {
      const res = await axios.get(import.meta.env.VITE_CINEMA_MOVIES_API);
      if (res.status === 200) {
        if (res.data.movies) {
          let movies: MovieObject[] = res.data.movies;
          dispatch(movieActions.replaceAllMovies(movies as MovieObject[]));
          dispatch(errorsActions.clearMovieError);
        }
      }
    } catch (error) {
      dispatch(errorsActions.setMovieError("Failed to get movies"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const addMovie = (data: MovieObject) => {
  return async function (dispatch: any) {
    try {
      const res = await axios.post(
        import.meta.env.VITE_CINEMA_MOVIES_API,
        data
      );
      if (res.status === 200) {
        if (res.data.movie) {
          dispatch(movieActions.addMovie(res.data.movie as MovieObject));
          dispatch(errorsActions.clearMovieError);
        }
      }
    } catch (error) {
      dispatch(errorsActions.setMovieError("Failed to add movie"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const updateMovie = (data: MovieObject, movieId: string) => {
  return async function (dispatch: any) {
    try {
      const res = await axios.put(
        import.meta.env.VITE_CINEMA_MOVIES_API + "/" + movieId,
        data
      );
      if (res.status === 200) {
        if (res.data.movie) {
          dispatch(movieActions.replaceMovie(res.data.movie as MovieObject));
          dispatch(errorsActions.clearMovieError);
        }
      }
    } catch (error) {
      dispatch(errorsActions.setMovieError("Failed to update movie"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const deleteMovie = (movieId: string) => {
  return async function (dispatch: any) {
    try {
      const res = await axios.delete(
        import.meta.env.VITE_CINEMA_MOVIES_API + "/" + movieId
      );
      if (res.status === 200) {
        dispatch(movieActions.deleteMovie(movieId));
        dispatch(errorsActions.clearMovieError);
      }
    } catch (error) {
      dispatch(errorsActions.setMovieError("Failed to delete movie"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const getMovieResolver = (movieId: string | undefined) => {
  return axios.get(import.meta.env.VITE_CINEMA_MOVIES_API + "/" + movieId);
};
