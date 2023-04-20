import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSubscription } from "../../store/subscriptions-actions";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import FormField from "../UI/FormField";
import {
  SubscriptionInputObject,
  SubscriptionInputSchema,
} from "../../types/subscriptionTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

const SubscriptionForm = () => {
  const dispatch = useAppDispatch();
  const { error: submitError } = useAppSelector((state) => state.subscriptions);
  const { register, handleSubmit, formState, reset } =
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
      <form
        className="flex flex-wrap gap-2 flex-col rounded-md bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          htmlFor="memberId"
          fieldLabel="memberId"
          register={register}
          errors={errors}
        />
        <FormField
          htmlFor="movieId"
          fieldLabel="movieId"
          register={register}
          errors={errors}
        />
        <FormField
          htmlFor="date"
          fieldLabel="date"
          type="date"
          errors={errors}
          register={register}
        />

        <div className="flex flex-wrap gap-2 mt-4">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            // TODO: close subscription form
            // onClick={() => navigate("/members", { replace: true })}
          >
            Cancel
          </Button>
        </div>
        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      </form>
    </Card>
  );
};

export default SubscriptionForm;
