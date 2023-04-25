import { Suspense } from "react";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from "react-router-dom";
import UserForm from "../../components/User/UserForm";
import { UserObject } from "../../types/userTypes";
import PageLayout from "../PageLayout";
import { getUserResolver } from "../../store/users-actions";
import { useAppSelector } from "../../hooks/store-hooks";

export default function UserDetails() {
  const { id: userId } = useParams<{ id: string }>();
  const storeUser = useAppSelector((state) =>
    state.users.users.find((u) => u._id === userId)
  );

  const data: any = useLoaderData() as { user: Promise<UserObject> };

  // If the user is already in the store, we don't need to fetch it again
  // If it's not in the store, we need to fetch it

  return (
    <PageLayout pageTitle="Edit User">
      {!!storeUser && <UserForm user={storeUser} />}
      {!storeUser && (
        <Suspense fallback={<p>Loading User Data...</p>}>
          <Await
            resolve={data.user}
            errorElement={<p>Failed to retrieve user</p>}
          >
            {(response) => {
              const { data } = response;
              const { user } = data as { user: UserObject };
              return (
                <>
                  <UserForm user={user} />
                </>
              );
            }}
          </Await>
        </Suspense>
      )}
    </PageLayout>
  );
}

export function userDetailsLoader(args: LoaderFunctionArgs) {
  const { id } = args.params;
  return defer({
    user: getUserResolver(id),
  });
}
