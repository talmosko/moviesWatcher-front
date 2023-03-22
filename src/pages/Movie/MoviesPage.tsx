import { useEffect, useState } from "react";
import Movie from "../../components/Movie/Movie";
import axios from "axios";
import { MovieObject } from "../../types/movieTypes";
const MoviesPage = () => {
  //TODO : store
  const [movies, setMovies] = useState<MovieObject[]>([]);
  const [hasGetMoviesError, setHasGetMoviesError] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_CINEMA_MOVIES_API);
        if (res.status === 200) {
          if (res.data.movies) {
            let movies: MovieObject[] = res.data.movies.map(
              (movie: MovieObject) => {
                return movie;
              }
            );
            setMovies(movies as MovieObject[]);
          }
        }
      } catch (error) {
        setHasGetMoviesError(true);
        //eslint-disable-next-line no-console
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <section>
        <h1>Movies</h1>
      </section>
      <section className="flex gap-4 flex-wrap">
        {!hasGetMoviesError &&
          movies.map((movie) => <Movie key={movie._id} movie={movie} />)}
        {hasGetMoviesError && <p>There was an error getting users</p>}
      </section>
    </>
  );
};

export default MoviesPage;
