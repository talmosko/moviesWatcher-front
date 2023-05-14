import { useEffect } from "react";
import Movie from "../../components/Movie/Movie";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { RootState } from "../../store/index";
import { getAllMovies } from "../../store/movie-actions";
import { useNavigate } from "react-router-dom";
import PageLayout from "../PageLayout";
import { getAllSubscriptions } from "../../store/subscriptions-actions";
import { usePermissions } from "../../hooks/use-permissions";

const MoviesPage = () => {
  const { movies, error: moviesError } = useAppSelector(
    (state: RootState) => state.movies
  );
  const permissions = usePermissions();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllMovies());
    dispatch(getAllSubscriptions());
  }, [dispatch]);

  return (
    <PageLayout
      pageTitle="Movies"
      titleButtonLabel="+ Add"
      titleButtonOnClick={() => navigate("new")}
      hasButtonPermission={permissions.CreateMovies}
    >
      {!moviesError &&
        movies.map((movie) => <Movie key={movie._id} movie={movie} />)}
      {!!moviesError && <p>There was an error getting movies</p>}
    </PageLayout>
  );
};

export default MoviesPage;
    