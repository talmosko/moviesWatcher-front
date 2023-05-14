import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import Button from "../UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSubscription } from "../../store/subscriptions-actions";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import FormField from "../UI/FormField";
import {
  SubscriptionInputObject,
  SubscriptionInputSchema,
  SubscriptionObject,
} from "../../types/subscriptionTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import Form from "../UI/Form";
import CardButtons from "../UI/CardButtons";
import Select from "../UI/Select";
import Input from "../UI/Input";
import { MovieObject } from "../../types/movieTypes";
import { MemberObject } from "../../types/memberTypes";

const SubscriptionForm = ({
  memberId,
  closeForm,
}: {
  memberId: string;
  closeForm: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { error: submitError } = useAppSelector((state) => state.subscriptions);

  const { register, handleSubmit, formState, reset, control } =
    useForm<SubscriptionInputObject>({
      resolver: zodResolver(SubscriptionInputSchema),
      defaultValues: { memberId: memberId },
      mode: "all",
    });
  const { errors } = formState;
  const onSubmit = async (data: SubscriptionInputObject) => {
    dispatch(postSubscription(data));
    if (!submitError) {
      reset();
      closeForm();
    }
  };
  return (
    <Card className="flex-col border-2 border-blue-900 ">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <MoviesControllerField
          control={control}
          errors={errors}
          memberId={memberId}
        />

        <FormField htmlFor="date" fieldLabel="Date" errors={errors}>
          <Input type="date" {...register("date")} />
        </FormField>

        <CardButtons>
          <Button type="submit">Save</Button>
          <Button type="button" onClick={closeForm}>
            Cancel
          </Button>
        </CardButtons>
        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      </Form>
    </Card>
  );
};

const MoviesControllerField = ({
  control,
  errors,
  memberId,
}: {
  control: Control<SubscriptionInputObject, any>;
  errors: FieldErrors<SubscriptionInputObject>;
  memberId: MemberObject["_id"];
}) => {
  const memberSubscriptions = useAppSelector((state) =>
    state.subscriptions.subscriptions.find(
      (sub) => sub.memberId._id === memberId
    )
  );
  const { movies: allMovies } = useAppSelector((state) => state.movies);
  const unsubscribedMovies = getUnsubscribedMovies(
    allMovies,
    memberSubscriptions
  );

  return (
    <Controller
      control={control}
      name="movieId"
      render={({ field }) => (
        <FormField htmlFor="movieId" fieldLabel="Choose Movie" errors={errors}>
          <Select {...field} className="w-full">
            <option value="">Select Movie</option>
            {unsubscribedMovies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.name}
              </option>
            ))}
          </Select>
        </FormField>
      )}
    />
  );
};

const getUnsubscribedMovies = (
  allMovies: MovieObject[],
  memberSubscriptions: SubscriptionObject | undefined
) => {
  const memberMoviesIds = memberSubscriptions?.movies.map(
    (movie) => movie.movieId._id
  );
  const unsubscribedMovies = allMovies.filter(
    (movie) => !memberMoviesIds?.includes(movie._id)
  );
  return unsubscribedMovies;
};

export default SubscriptionForm;
  