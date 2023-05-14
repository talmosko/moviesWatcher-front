import { useEffect } from "react";
import User from "../../components/User/User";
import { useNavigate } from "react-router-dom";
import PageLayout from "../PageLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { getAllUsers } from "../../store/users-actions";
import { usePermissions } from "../../hooks/use-permissions";

const UsersPage = () => {
  const { users, error: usersError } = useAppSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const permissions = usePermissions();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <PageLayout
      pageTitle="Users"
      titleButtonLabel="+ Add"
      titleButtonOnClick={() => navigate("new")}
      hasButtonPermission={permissions.SiteAdmin}
    >
      {!usersError && users.map((user) => <User key={user._id} user={user} />)}
      {usersError && <p>There was an error getting users</p>}
    </PageLayout>
  );
};

export default UsersPage;
   