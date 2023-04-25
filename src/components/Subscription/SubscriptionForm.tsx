import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import Button from "../UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSubscription } from "../../store/subscriptions-actions";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import FormField, { FieldLabel } from "../UI/FormField";
import {
  SubscriptionInputObject,
  SubscriptionInputSchema,
} from "../../types/subscriptionTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import Form from "../UI/Form";
import CardButtons from "../UI/CardButtons";
import Select from "../UI/Select";

const SubscriptionForm = ({ memberId }: { memberId: string }) => {
  const dispatch = useAppDispatch();
  const { error: submitError } = useAppSelector((state) => state.subscriptions);
  const { register, handleSubmit, formState, reset, control } =
    useForm<SubscriptionInputObject>({
      resolver: zodResolver(SubscriptionInputSchema),
      mode: "all",
    });
  const { errors } = formState;

  const onSubmit = async (data: SubscriptionInputObject) => {
    dispatch(postSubscription(data));
    if (!submitError) {
      reset();
      //TODO: close subscription form
    }
  };
  return (
    <Card className="w-3/5 flex-col">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value={memberId} {...register("memberId")} />

        <FormField htmlFor="movieId" fieldLabel="movieId" errors={errors}>
          <input type="text" {...register("movieId")} />
        </FormField>

        <MoviesControllerField control={control} errors={errors} />

        <FormField htmlFor="date" fieldLabel="Date" errors={errors}>
          <input type="date" {...register("date")} />
        </FormField>

        <CardButtons>
          <Button type="submit">Save</Button>
          <Button
            type="button"
            // TODO: close subscription form
            // onClick={() => navigate("/members", { replace: true })}
          >
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
}: {
  control: Control<SubscriptionInputObject, any>;
  errors: FieldErrors<SubscriptionInputObject>;
}) => {
  return (
    <Controller
      control={control}
      name="movieId"
      render={({ field }) => (
        <FormField htmlFor="movieId" fieldLabel="Choose Movie" errors={errors}>
          <Select {...field} className="w-full">
            <option value="">Select Movie</option>
            <option value="60b9e4f3c9e9b3a5c8e0e9b1">
              The Shawshank Redemption
            </option>
            <option value="60b9e4f3c9e9b3a5c8e0e9b2">The Godfather</option>
            <option value="60b9e4f3c9e9b3a5c8e0e9b3">The Dark Knight</option>
          </Select>
        </FormField>
      )}
    />
  );
};
export default SubscriptionForm;
