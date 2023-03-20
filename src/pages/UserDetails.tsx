import axios from "axios";
import { Suspense } from "react";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import UserForm from "../components/UserForm";
import { UserObject } from "../types/userTypes";

export default function UserDetails() {
  const data: any = useLoaderData();

  return (
    <Suspense fallback={<p>Loading User Data...</p>}>
      <Await resolve={data.user} errorElement={<p>Failed to retrieve user</p>}>
        {(response) => {
          const { data } = response;
          const { user } = data as { user: UserObject };
          user.createdAt = user.createdAt && new Date(user.createdAt);
          return (
            <>
              <UserForm user={user} />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

export function userDetailsLoader(args: LoaderFunctionArgs) {
  const { id } = args.params;
  return defer({
    user: axios.get(import.meta.env.VITE_CINEMA_USERS_API + `/${id}`),
  });
}
