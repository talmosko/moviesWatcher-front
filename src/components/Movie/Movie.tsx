import { useNavigate } from "react-router-dom";
import { MovieObject } from "../../types/movieTypes";
import Card, { CardSubTitle, CardTitle } from "../UI/Card";
import EntityButtons from "../UI/EntityButtons";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { deleteMovie } from "../../store/movie-actions";
import { SubscriptionForMovieObject } from "../../types/subscriptionTypes";

const Movie = ({ movie }: { movie: MovieObject }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const subscriptionsForMovie: SubscriptionForMovieObject[] = useAppSelector(
    (state) => {
      return state.subscriptions.subscriptions.reduce((prev, current) => {
        const subMovie = current.movies.find(
          (elMovie) => elMovie.movieId._id === movie._id
        );
        if (subMovie)
          prev.push({
            memberId: current.memberId,
            _id: current._id,
            date: subMovie.date,
          });
        return prev;
      }, [] as SubscriptionForMovieObject[]);
    }
  );
  const handleEdit = () => {
    navigate(`/movies/${movie._id}`);
  };

  const handleDelete = () => {
    dispatch(deleteMovie(movie._id!));
  };

  return (
    <Card className="sm:w-80 gap-2">
      <div className="w-40 flex">
        <img src={movie.image} className="self-center" alt={movie.name} />
      </div>
      <div className="flex flex-col w-full">
        <CardTitle>{`${movie.name}, ${movie.premiered.substring(
          0,
          4
        )}`}</CardTitle>
        <CardSubTitle>{movie.genres?.join(", ")}</CardSubTitle>
        {subscriptionsForMovie &&
          subscriptionsForMovie.map((subscription) => (
            <p key={subscription._id}>
              {subscription.memberId.name} {subscription.date}
            </p>
          ))}
        <EntityButtons onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </Card>
  );
};

export default Movie;
