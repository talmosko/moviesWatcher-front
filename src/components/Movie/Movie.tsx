import { Link, useNavigate } from "react-router-dom";
import { MovieObject } from "../../types/movieTypes";
import Card, { CardSubTitle, CardTitle } from "../UI/Card";
import CardButtons from "../UI/CardButtons";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { deleteMovie } from "../../store/movie-actions";
import { SubscriptionForMovieObject } from "../../types/subscriptionTypes";
import UnorderedList from "../UI/UnorderedList";
import ListItem from "../UI/ListItem";
import { usePermissions } from "../../hooks/use-permissions";
import Button from "../UI/Button";

const Movie = ({ movie }: { movie: MovieObject }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const permissions = usePermissions();
  const handleEdit = () => {
    navigate(`/movies/${movie._id}`);
  };

  const handleDelete = () => {
    dispatch(deleteMovie(movie._id!));
  };

  const cardTitle = `${movie.name}, ${movie.premiered.substring(0, 4)}`;

  return (
    <Card className="lg:w-[49%] w-full gap-4 items-start">
      <MovieImg movie={movie} />
      <div className="flex flex-col w-full">
        <CardTitle>{cardTitle}</CardTitle>
        <CardSubTitle>{movie.genres?.join(", ")}</CardSubTitle>
        <SubscriptionsForMovie movieId={movie._id} />
        <CardButtons>
          {permissions.UpdateMovies && (
            <Button onClick={handleEdit}>Edit</Button>
          )}
          {permissions.DeleteMovies && (
            <Button onClick={handleDelete}>Delete</Button>
          )}
        </CardButtons>
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
      <p>Subscriptions:</p>
      <UnorderedList>
        {subscriptionsForMovie &&
          subscriptionsForMovie.map((sub) => (
            <ListItem key={sub.memberId._id!}>
              <Link
                className="underline text-blue-800"
                to={`/members/${sub.memberId._id!}`}
              >
                {sub.memberId.name}
              </Link>
              ,{new Date(sub.date).toLocaleDateString()}
            </ListItem>
          ))}
      </UnorderedList>
    </>
  );
};

const MovieImg = ({ movie }: { movie: MovieObject }) => {
  return (
    <div className="w-44 flex">
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
   