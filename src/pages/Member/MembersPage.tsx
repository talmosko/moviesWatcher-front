import { useEffect, useState } from "react";
import Member from "../../components/Member/Member";
import axios from "axios";
import { MemberObject } from "../../types/memberTypes";
const MembersPage = () => {
  const [members, setMembers] = useState<MemberObject[]>([]);
  const [hasGetMembersError, setHasGetMembersError] = useState<boolean>(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_CINEMA_MEMBERS_API);
        if (res.status === 200) {
          if (res.data.members) {
            let members: MemberObject[] = res.data.members;
            setMembers(members as MemberObject[]);
          }
        }
      } catch (error) {
        setHasGetMembersError(true);
        //eslint-disable-next-line no-console
        console.log(error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <>
      <section>
        <h1>Members</h1>
      </section>
      <section className="flex gap-4 flex-wrap">
        {!hasGetMembersError &&
          members.map((member) => <Member key={member._id} member={member} />)}
        {hasGetMembersError && <p>There was an error getting members</p>}
      </section>
    </>
  );
};

export default MembersPage;
