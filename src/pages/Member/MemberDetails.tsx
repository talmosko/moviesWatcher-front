import { Suspense } from "react";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from "react-router-dom";
import MemberForm from "../../components/Member/MemberForm";
import { useAppSelector } from "../../hooks/store-hooks";
import { getMemberResolver } from "../../store/member-actions";
import { MemberObject } from "../../types/memberTypes";
import PageLayout from "../PageLayout";

export default function MemberDetails() {
  const { id: memberId } = useParams<{ id: string }>();
  const storeMember = useAppSelector((state) =>
    state.members.members.find((m) => m._id === memberId)
  );

  const data: any = useLoaderData() as { member: Promise<MemberObject> };

  // If the member is already in the store, we don't need to fetch it again
  // If it's not in the store, we need to fetch it

  return (
    <PageLayout pageTitle="Edit Member">
      {!!storeMember && <MemberForm member={storeMember} />}
      {!storeMember && (
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
      )}
    </PageLayout>
  );
}

export function memberDetailsLoader(args: LoaderFunctionArgs) {
  const { id } = args.params;
  return defer({
    member: getMemberResolver(id),
  });
}
