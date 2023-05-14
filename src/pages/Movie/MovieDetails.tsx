import { Suspense } from "react";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from "react-router-dom";
import MovieForm from "../../components/Movie/MovieForm";
import { MovieObject } from "../../types/movieTypes";
import { getMovieResolver } from "../../store/movie-actions";
import { useAppSelector } from "../../hooks/store-hooks";
import PageLayout from "../PageLayout";

export default function MovieDetails() {
  const { id: movieId } = useParams<{ id: string }>();
  const storeMovie = useAppSelector((state) =>
    state.movies.movies.find((m) => m._id === movieId)
  );
  const data = useLoaderData() as { movie: Promise<MovieObject> };

  // If the movie is already in the store, we don't need to fetch it again
  // If it's not in the store, we need to fetch it
  return (
    <PageLayout pageTitle="Edit Movie">
      {!!storeMovie && <MovieForm movie={storeMovie} />}

      {!storeMovie && (
        <Suspense fallback={<p>Loading Movie Data...</p>}>
          <Await
            resolve={data.movie}
            errorElement={<p>Failed to retrieve movie</p>}
          >
            {(response) => {
              const { data } = response;
              const { movie } = data as { movie: MovieObject };
              return (
                <>
                  <MovieForm movie={movie} />
                </>
              );
            }}
          </Await>
        </Suspense>
      )}
    </PageLayout>
  );
}

export function movieDetailsLoader(args: LoaderFunctionArgs) {
  const { id } = args.params;
  return defer({
    movie: getMovieResolver(id),
  });
}
  