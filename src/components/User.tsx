import { useNavigate } from "react-router-dom";
import { PermissionType, UserObject } from "../types/userTypes";
import Button from "./UI/Button";

const User: React.FC<{ user: UserObject }> = ({ user }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/users/${user._id}`);
  };

  return (
    <div className="flex flex-col w-80 rounded-md bg-white p-2">
      <h3 className="text-gray-500 font-medium">{user.fullName}</h3>
      <h4 className="font-semibold">{user.userName}</h4>
      <p>Session Time Out (Minutes): {user.sessionTimeout}</p>
      <p>Created Data: {user.createdAt?.toLocaleDateString()}</p>
      <p>Permissions: {user.permissions}</p>

      <div className="flex flex-wrap flex-auto justify-end gap-2  items-end">
        <Button onClick={handleEdit}>Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
};

export default User;
