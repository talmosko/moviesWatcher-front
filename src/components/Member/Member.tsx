import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { MemberObject } from "../../types/memberTypes";
import SubscriptionForm from "../Subscription/SubscriptionForm";
import Card from "../UI/Card";
import EntityButtons from "../UI/CardButtons";
import { deleteMember } from "../../store/member-actions";
import { useState } from "react";
import Button from "../UI/Button";
import UnorderedList from "../UI/UnorderedList";
import ListItem from "../UI/ListItem";
import { usePermissions } from "../../hooks/use-permissions";

const Member: React.FC<{ member: MemberObject }> = ({ member }) => {
  const permissions = usePermissions();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubFormOpen, setIsSubFormOpen] = useState<boolean>(false);

  const handleEdit = () => {
    navigate(`/members/${member._id}`);
  };

  const handleDelete = () => {
    dispatch(deleteMember(member._id!));
  };

  return (
    <Card
      className="flex-col lg:w-[49%] w-full"
      title={member.name}
      subTitle={member.email}
    >
      <p>City: {member.city}</p>
      <SubscriptionsForMember memberId={member._id} />
      {isSubFormOpen && (
        <SubscriptionForm
          memberId={member._id!}
          closeForm={() => setIsSubFormOpen(false)}
        />
      )}

      <EntityButtons>
        {!isSubFormOpen && permissions.CreateSubscriptions && (
          <Button className="w-20" onClick={() => setIsSubFormOpen(true)}>
            Subscribe
          </Button>
        )}
        {permissions.UpdateSubscriptions && (
          <Button onClick={handleEdit}>Edit</Button>
        )}
        {permissions.DeleteSubscriptions && (
          <Button onClick={handleDelete}>Delete</Button>
        )}
      </EntityButtons>
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
      <p>Subscriptions:</p>
      <UnorderedList>
        {subscriptionsForMember &&
          subscriptionsForMember.movies.map((movie) => (
            <ListItem key={movie.movieId._id!}>
              <Link
                className="underline text-blue-800"
                to={`/movies/${movie.movieId._id}`}
              >
                {movie.movieId.name}
              </Link>
              ,{new Date(movie.date).toLocaleDateString()}
            </ListItem>
          ))}
      </UnorderedList>
    </>
  );
};
export default Member;
