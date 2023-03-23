import { useForm } from "react-hook-form";

import Button from "../UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import FormField from "../UI/FormField";
import {
  SubscriptionInputObject,
  SubscriptionInputSchema,
} from "../../types/subscriptionTypes";

const SubscriptionForm = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState } =
    useForm<SubscriptionInputObject>({
      resolver: zodResolver(SubscriptionInputSchema),
      mode: "all",
    });
  const { errors } = formState;

  const onSubmit = async (data: SubscriptionInputObject) => {
    const address = import.meta.env.VITE_CINEMA_SUBSCRIPTIONS_API;
    try {
      const res = await axios(address, {
        method: "POST",
        data,
      });
      console.log(res);

      if (res.status === 200 || res.status === 201) {
        navigate("/members", { replace: true });
      } else {
        //eslint-disable-next-line no-console
        setSubmitError("There was an error submitting the form");
      }
    } catch (error) {
      //eslint-disable-next-line no-console
      console.log(error);
      setSubmitError("There was an error submitting the form");
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
            onClick={() => navigate("/members", { replace: true })}
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
