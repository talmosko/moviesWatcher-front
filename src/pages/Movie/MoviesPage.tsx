import { useEffect } from "react";
import Movie from "../../components/Movie/Movie";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { RootState } from "../../store/index";
import { getAllMovies } from "../../store/movie-actions";

const MoviesPage = () => {
  const { movies } = useAppSelector((state: RootState) => state.movies);
  const { movieError } = useAppSelector((state: RootState) => state.errors);
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
        {!movieError &&
          movies.map((movie) => <Movie key={movie._id} movie={movie} />)}
        {!!movieError && <p>There was an error getting users</p>}
      </section>
    </>
  );
};

export default MoviesPage;
