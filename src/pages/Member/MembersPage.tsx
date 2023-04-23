import { useEffect } from "react";
import Member from "../../components/Member/Member";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { RootState } from "../../store";
import { getAllMembers } from "../../store/member-actions";
import { getAllSubscriptions } from "../../store/subscriptions-actions";

const MembersPage = () => {
  const { members, error: membersError } = useAppSelector(
    (state: RootState) => state.members
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllMembers());
    dispatch(getAllSubscriptions());
  }, [dispatch]);

  return (
    <>
      <section>
        <h1>Members</h1>
      </section>
      <section className="flex gap-4 flex-wrap">
        {!membersError &&
          members.map((member) => <Member key={member._id} member={member} />)}
        {!!membersError && <p>There was an error getting members</p>}
      </section>
    </>
  );
};

export default MembersPage;
