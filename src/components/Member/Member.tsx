import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { MemberObject } from "../../types/memberTypes";
import SubscriptionForm from "../Subscription/SubscriptionForm";
import Card, { CardSubTitle, CardTitle } from "../UI/Card";
import EntityButtons from "../UI/EntityButtons";
import { deleteMember } from "../../store/member-actions";

const Member: React.FC<{ member: MemberObject }> = ({ member }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const subscriptionsForMember = useAppSelector((state) => {
    return state.subscriptions.subscriptions.find(
      (subscription) => subscription.memberId?._id === member._id
    );
  });

  const handleEdit = () => {
    navigate(`/members/${member._id}`);
  };

  const handleDelete = () => {
    dispatch(deleteMember(member._id!));
  };

  return (
    <Card className="sm:w-92 flex-col">
      <CardTitle>{member.name}</CardTitle>
      <CardSubTitle>{member.email}</CardSubTitle>
      <p>{member.city}</p>
      {subscriptionsForMember &&
        subscriptionsForMember.movies.map((movie) => (
          <p key={movie.movieId._id}>{`${movie.movieId.name} ${movie.date}`}</p>
        ))}
      <SubscriptionForm />
      <EntityButtons onEdit={handleEdit} onDelete={handleDelete} />
    </Card>
  );
};

export default Member;
