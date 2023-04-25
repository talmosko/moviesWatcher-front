import { useEffect } from "react";
import Member from "../../components/Member/Member";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { getAllMembers } from "../../store/member-actions";
import { getAllSubscriptions } from "../../store/subscriptions-actions";
import PageLayout from "../PageLayout";
import { useNavigate } from "react-router-dom";

const MembersPage = () => {
  const { members, error: membersError } = useAppSelector(
    (state) => state.members
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllMembers());
    dispatch(getAllSubscriptions());
  }, [dispatch]);

  return (
    <PageLayout
      pageTitle="Members"
      titleButtonLabel="+ Add"
      titleButtonOnClick={() => navigate("new")}
    >
      {!membersError &&
        members.map((member) => <Member key={member._id} member={member} />)}
      {!!membersError && <p>There was an error getting members</p>}
    </PageLayout>
  );
};

export default MembersPage;
