import { useNavigate } from "react-router-dom";
import { UserObject } from "../../types/userTypes";
import Card from "../UI/Card";
import CardButtons from "../UI/CardButtons";
import { deleteUser } from "../../store/users-actions";
import { useAppDispatch } from "../../hooks/store-hooks";
import UnorderedList from "../UI/UnorderedList";
import ListItem from "../UI/ListItem";
import Button from "../UI/Button";
import { usePermissions } from "../../hooks/use-permissions";

const User: React.FC<{ user: UserObject }> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const permissions = usePermissions();

  const handleEdit = () => {
    navigate(`/users/${user._id}`);
  };

  const handleDelete = async () => {
    dispatch(deleteUser(user._id!));
  };

  return (
    <Card
      className="flex-col lg:w-[49%] w-full"
      title={user.fullName}
      subTitle={user.userName}
    >
      <p>Session Time Out (Minutes): {user.sessionTimeout}</p>
      <p>
        {"Created Data: "}
        {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
      </p>
      <UserPermissions permissions={user.permissions} />
      {permissions.SiteAdmin && (
        <CardButtons>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </CardButtons>
      )}
    </Card>
  );
};

const UserPermissions = ({
  permissions,
}: {
  permissions: UserObject["permissions"];
}) => {
  return (
    <>
      <p>Permissions:</p>
      <UnorderedList>
        {permissions?.map((permission) => (
          <ListItem key={permission}>{permission}</ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

export default User;
 