import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserObject } from "../types/userTypes";
import Button from "./UI/Button";

const User: React.FC<{ user: UserObject }> = ({ user }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/users/${user._id}`);
  };

  const handleDelete = async () => {
    try {
      const address = `${import.meta.env.VITE_CINEMA_USERS_API}/${user._id}`;
      console.log(address);
      const res = await axios.delete(address);
      if (res.status === 200) {
        navigate(0);
      } else {
        //eslint-disable-next-line no-console
        console.log(res);
      }
    } catch (error) {
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-80 rounded-md bg-white p-2">
      <h3 className="text-gray-500 font-medium">{user.fullName}</h3>
      <h4 className="font-semibold">{user.userName}</h4>
      <p>Session Time Out (Minutes): {user.sessionTimeout}</p>
      <p>Created Data: {user.createdAt?.toLocaleDateString()}</p>
      <p>Permissions: {user.permissions}</p>

      <div className="flex flex-wrap flex-auto justify-end gap-2 items-end">
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default User;
