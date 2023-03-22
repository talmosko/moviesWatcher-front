import axios from "axios";
import { Suspense } from "react";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import MovieForm from "../../components/Movie/MovieForm";
import { MovieObject } from "../../types/movieTypes";

export default function MovieDetails() {
  const data: any = useLoaderData();

  //TODO: Maybe transfer movie data from store? why do we need another request?
  return (
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
  );
}

export function movieDetailsLoader(args: LoaderFunctionArgs) {
  const { id } = args.params;
  return defer({
    movie: axios.get(import.meta.env.VITE_CINEMA_MOVIES_API + `/${id}`),
  });
}
