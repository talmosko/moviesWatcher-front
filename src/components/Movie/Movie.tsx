import { useNavigate } from "react-router-dom";
import { MovieObject } from "../../types/movieTypes";
import Card, { CardSubTitle, CardTitle } from "../UI/Card";
import EntityButtons from "../UI/CardButtons";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { deleteMovie } from "../../store/movie-actions";
import { SubscriptionForMovieObject } from "../../types/subscriptionTypes";

const Movie = ({ movie }: { movie: MovieObject }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    navigate(`/movies/${movie._id}`);
  };

  const handleDelete = () => {
    dispatch(deleteMovie(movie._id!));
  };

  const cardTitle = `${movie.name}, ${movie.premiered.substring(0, 4)}`;

  return (
    <Card className="sm:w-96 w-full gap-2">
      <MovieImg movie={movie} />
      <div className="flex flex-col w-full">
        <CardTitle>{cardTitle}</CardTitle>
        <CardSubTitle>{movie.genres?.join(", ")}</CardSubTitle>
        <SubscriptionsForMovie movieId={movie._id} />
        <EntityButtons onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </Card>
  );
};

const SubscriptionsForMovie = ({
  movieId,
}: {
  movieId: MovieObject["_id"];
}) => {
  const subscriptionsForMovie: SubscriptionForMovieObject[] = useAppSelector(
    (state) => {
      return state.subscriptions.subscriptions.reduce((prev, current) => {
        const subMovie = current.movies.find(
          (elMovie) => elMovie.movieId._id === movieId
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

  return (
    <>
      {subscriptionsForMovie &&
        subscriptionsForMovie.map((subscription) => (
          <p key={subscription._id}>
            {subscription.memberId.name} {subscription.date}
          </p>
        ))}
    </>
  );
};

const MovieImg = ({ movie }: { movie: MovieObject }) => {
  return (
    <div className="w-40 flex">
      <img
        src={movie.image}
        className="self-center"
        alt={movie.name}
        loading="lazy"
      />
    </div>
  );
};

export default Movie;
