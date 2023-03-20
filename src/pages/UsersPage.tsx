import { useEffect, useState } from "react";
import User from "../components/User";
import axios from "axios";
import { UserObject } from "../types/userTypes";
const UsersPage = () => {
  const [users, setUsers] = useState<UserObject[]>([]);
  const [hasGetUsersError, setHasGetUsersError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_CINEMA_USERS_API);
        if (res.status === 200) {
          if (res.data.users) {
            let users: UserObject[] = res.data.users.map((user: UserObject) => {
              return {
                ...user,
                createdAt: user.createdAt && new Date(user.createdAt),
              };
            });
            setUsers(users as UserObject[]);
          }
        }
      } catch (error) {
        setHasGetUsersError(true);
        //eslint-disable-next-line no-console
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <section>
        <h1>User Management</h1>
      </section>
      <section className="flex gap-4 flex-wrap">
        {!hasGetUsersError &&
          users.map((user) => <User key={user._id} user={user} />)}
        {hasGetUsersError && <p>There was an error getting users</p>}
      </section>
    </>
  );
};

export default UsersPage;
