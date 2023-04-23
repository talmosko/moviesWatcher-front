import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import FormField from "../UI/FormField";
import { AuthObject, AuthSchema } from "../../types/userTypes";

const AuthForm = ({ isSignup }: { isSignup: boolean }) => {
  const data = useActionData() as { errors?: string[]; message?: string };
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";
  const { register, formState, handleSubmit, reset } = useForm<AuthObject>({
    resolver: zodResolver(AuthSchema),
    mode: "all",
  });

  const { errors } = formState;

  const onSubmit = (formData: AuthObject) => {
    submit(
      { ...formData, isSignup: `${isSignup}` },
      { method: "post", replace: true }
    );

    reset();
  };

  return (
    <Card className="w-3/5 flex-col">
      <h1>{isSignup ? "Create a new user" : "Log in"}</h1>

      {data && data.message && <ErrorMessage>{data.message}</ErrorMessage>}

      <form
        className="flex flex-wrap gap-2 flex-col rounded-md bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          htmlFor="userName"
          fieldLabel="User Name"
          register={register}
          errors={errors}
        />
        <FormField
          htmlFor="password"
          fieldLabel="Password"
          type="password"
          register={register}
          errors={errors}
        />

        <div className="flex flex-wrap gap-2 mt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : isSignup ? "Sign Up" : "Login"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
