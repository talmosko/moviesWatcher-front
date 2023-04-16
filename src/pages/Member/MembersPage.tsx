import { useEffect, useState } from "react";
import Member from "../../components/Member/Member";
import axios from "axios";
import { MemberObject } from "../../types/memberTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { RootState } from "../../store";
import { getAllMembers } from "../../store/member-actions";

const MembersPage = () => {
  const { members } = useAppSelector((state: RootState) => state.members);
  const { memberError } = useAppSelector((state: RootState) => state.errors);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllMembers());
  }, [dispatch]);

  return (
    <>
      <section>
        <h1>Members</h1>
      </section>
      <section className="flex gap-4 flex-wrap">
        {!memberError &&
          members.map((member) => <Member key={member._id} member={member} />)}
        {!!memberError && <p>There was an error getting members</p>}
      </section>
    </>
  );
};

export default MembersPage;
