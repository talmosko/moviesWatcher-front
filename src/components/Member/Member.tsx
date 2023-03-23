import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MemberObject } from "../../types/memberTypes";
import SubscriptionForm from "../Subscription/SubscriptionForm";
import Card, { CardSubTitle, CardTitle } from "../UI/Card";
import EntityButtons from "../UI/EntityButtons";

const Member: React.FC<{ member: MemberObject }> = ({ member }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/members/${member._id}`);
  };

  const handleDelete = async () => {
    try {
      const address = `${import.meta.env.VITE_CINEMA_MEMBERS_API}/${
        member._id
      }`;
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
      <CardTitle>{member.name}</CardTitle>
      <CardSubTitle>{member.email}</CardSubTitle>
      <p>{member.city}</p>
      {member.subscriptions?.movies?.map((movie) => (
        <p key={movie.movieId._id}>{`${movie.movieId.name} ${movie.date}`}</p>
      ))}
      <SubscriptionForm />
      <EntityButtons onEdit={handleEdit} onDelete={handleDelete} />
    </Card>
  );
};

export default Member;
