import { useEffect } from "react";
import Movie from "../../components/Movie/Movie";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { RootState } from "../../store/index";
import { getAllMovies } from "../../store/movie-actions";

const MoviesPage = () => {
  const { movies, error: moviesError } = useAppSelector(
    (state: RootState) => state.movies
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <>
      <section>
        <h1>Movies</h1>
      </section>
      <section className="flex gap-4 flex-wrap">
        {!moviesError &&
          movies.map((movie) => <Movie key={movie._id} movie={movie} />)}
        {!!moviesError && <p>There was an error getting users</p>}
      </section>
    </>
  );
};

export default MoviesPage;
