import { useNavigate } from "react-router-dom";
import { UserObject } from "../../types/userTypes";
import Card from "../UI/Card";
import CardButtons from "../UI/CardButtons";
import { deleteUser } from "../../store/users-actions";
import { useAppDispatch } from "../../hooks/store-hooks";

const User: React.FC<{ user: UserObject }> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    navigate(`/users/${user._id}`);
  };

  const handleDelete = async () => {
    dispatch(deleteUser(user._id!));
  };

  return (
    <Card
      className="flex-col w-96 sm:w-96"
      title={user.fullName}
      subTitle={user.userName}
    >
      <p>Session Time Out (Minutes): {user.sessionTimeout}</p>
      <p>
        {"Created Data: "}
        {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
      </p>
      <UserPermissions permissions={user.permissions} />
      <CardButtons onEdit={handleEdit} onDelete={handleDelete} />
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
      <ul className="pl-2">
        {permissions?.map((permission) => (
          <li className="font-medium text-sm text-gray-600" key={permission}>
            {permission}
          </li>
        ))}
      </ul>
    </>
  );
};

export default User;
