import axios from "axios";
import { Suspense } from "react";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import MemberForm from "../../components/Member/MemberForm";
import { MemberObject } from "../../types/memberTypes";

export default function MemberDetails() {
  const data: any = useLoaderData();

  //TODO: Maybe transfer member data from store? why do we need another request?
  return (
    <Suspense fallback={<p>Loading Member Data...</p>}>
      <Await
        resolve={data.member}
        errorElement={<p>Failed to retrieve member</p>}
      >
        {(response) => {
          const { data } = response;
          const { member } = data as { member: MemberObject };
          return (
            <>
              <MemberForm member={member} />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

export function memberDetailsLoader(args: LoaderFunctionArgs) {
  const { id } = args.params;
  return defer({
    member: axios.get(import.meta.env.VITE_CINEMA_MEMBERS_API + `/${id}`),
  });
}
