import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserObject } from "../../types/userTypes";
import Card, { CardSubTitle, CardTitle } from "../UI/Card";
import EntityButtons from "../UI/EntityButtons";

const User: React.FC<{ user: UserObject }> = ({ user }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/users/${user._id}`);
  };

  const handleDelete = async () => {
    try {
      const address = `${import.meta.env.VITE_CINEMA_USERS_API}/${user._id}`;
      const res = await axios.delete(address);
      if (res.status === 200) {
        //TODO: something more elegant with store
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
    <Card className="sm:w-92 flex-col">
      <CardTitle>{user.fullName}</CardTitle>
      <CardSubTitle>{user.userName}</CardSubTitle>
      <p>Session Time Out (Minutes): {user.sessionTimeout}</p>
      <p>Created Data: {user.createdAt?.toLocaleDateString()}</p>
      <p>Permissions: {user.permissions}</p>

      <EntityButtons onEdit={handleEdit} onDelete={handleDelete} />
    </Card>
  );
};

export default User;
