import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { MemberObject } from "../../types/memberTypes";
import SubscriptionForm from "../Subscription/SubscriptionForm";
import Card from "../UI/Card";
import EntityButtons from "../UI/CardButtons";
import { deleteMember } from "../../store/member-actions";

const Member: React.FC<{ member: MemberObject }> = ({ member }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    navigate(`/members/${member._id}`);
  };

  const handleDelete = () => {
    dispatch(deleteMember(member._id!));
  };

  return (
    <Card
      className="w-full sm:w-96 flex-col"
      title={member.name}
      subTitle={member.email}
    >
      <p>{member.city}</p>
      <SubscriptionsForMember memberId={member._id} />
      <SubscriptionForm />
      <EntityButtons onEdit={handleEdit} onDelete={handleDelete} />
    </Card>
  );
};

const SubscriptionsForMember = ({
  memberId,
}: {
  memberId: MemberObject["_id"];
}) => {
  const subscriptionsForMember = useAppSelector((state) => {
    return state.subscriptions.subscriptions.find(
      (subscription) => subscription.memberId?._id === memberId
    );
  });

  return (
    <>
      {subscriptionsForMember &&
        subscriptionsForMember.movies.map((movie) => (
          <p key={movie.movieId._id}>{`${movie.movieId.name} ${movie.date}`}</p>
        ))}
    </>
  );
};
export default Member;
