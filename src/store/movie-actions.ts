import axios from "axios";
import { MovieObject } from "../types/movieTypes";
import { movieActions } from "./movies-slice";
import { SubscriptionObject } from "../types/subscriptionTypes";
import { subscriptionActions } from "./subscriptions-slice";
import { AppDispatch } from ".";

export const getAllMovies = () => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(movieActions.setMoviesLoading(true));
      const res = await axios.get(import.meta.env.VITE_CINEMA_MOVIES_API, {
        withCredentials: true,
      });
      if (res.status === 200) {
        if (res.data.movies) {
          let movies: MovieObject[] = res.data.movies;
          dispatch(movieActions.replaceAllMovies(movies as MovieObject[]));
          dispatch(movieActions.setMoviesError(null));
        }
      }
      dispatch(movieActions.setMoviesLoading(false));
    } catch (error) {
      dispatch(movieActions.setMoviesLoading(false));
      dispatch(movieActions.setMoviesError("Failed to get movies"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const addMovie = (data: MovieObject) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(movieActions.setMoviesLoading(true));
      const res = await axios.post(
        import.meta.env.VITE_CINEMA_MOVIES_API,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        if (res.data.movie) {
          dispatch(movieActions.addMovie(res.data.movie as MovieObject));
          dispatch(movieActions.setMoviesError(null));
        }
      }
      dispatch(movieActions.setMoviesLoading(false));
    } catch (error) {
      dispatch(movieActions.setMoviesLoading(false));
      dispatch(movieActions.setMoviesError("Failed to add movie"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const updateMovie = (data: MovieObject, movieId: string) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(movieActions.setMoviesLoading(true));
      const res = await axios.put(
        import.meta.env.VITE_CINEMA_MOVIES_API + "/" + movieId,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        if (res.data.movie) {
          dispatch(movieActions.replaceMovie(res.data.movie as MovieObject));
          dispatch(movieActions.setMoviesError(null));
        }
      }
      dispatch(movieActions.setMoviesLoading(false));
    } catch (error) {
      dispatch(movieActions.setMoviesLoading(false));
      dispatch(movieActions.setMoviesError("Failed to update movie"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const deleteMovie = (movieId: string) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(movieActions.setMoviesLoading(true));
      const res = await axios.delete(
        import.meta.env.VITE_CINEMA_MOVIES_API + "/" + movieId,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = res.data as {
          movieId: MovieObject["_id"];
          subscriptions: SubscriptionObject[];
        };
        dispatch(movieActions.deleteMovie(data.movieId!));
        dispatch(subscriptionActions.replaceSubscriptions(data.subscriptions));
        dispatch(movieActions.setMoviesError(null));
      }
      dispatch(movieActions.setMoviesLoading(false));
    } catch (error) {
      dispatch(movieActions.setMoviesLoading(false));
      dispatch(movieActions.setMoviesError("Failed to delete movie"));
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const getMovieResolver = (movieId: string | undefined) => {
  return axios.get(import.meta.env.VITE_CINEMA_MOVIES_API + "/" + movieId, {
    withCredentials: true,
  });
};
    