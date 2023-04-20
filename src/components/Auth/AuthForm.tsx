import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import FormField from "../UI/FormField";
import { AuthObject, AuthSchema } from "../../types/userTypes";

const AuthForm = ({ isSignup }: { isSignup: boolean }) => {
  const data = useActionData() as { errors?: string[]; message?: string };
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";
  const { register, formState } = useForm<AuthObject>({
    resolver: zodResolver(AuthSchema),
    mode: "all",
  });

  const { errors, isValid } = formState;

  return (
    <Card className="w-3/5 flex-col">
      <h1>{isSignup ? "Create a new user" : "Log in"}</h1>
      {data && data.errors && (
        <ErrorMessage>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ErrorMessage>
      )}
      {data && data.message && <ErrorMessage>{data.message}</ErrorMessage>}
      <Form
        method="post"
        className="flex flex-wrap gap-2 flex-col rounded-md bg-white"
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

        <input type="hidden" name="isSignup" value={`${isSignup}`} />

        <div className="flex flex-wrap gap-2 mt-4">
          <Button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? "Submitting" : isSignup ? "Sign Up" : "Login"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default AuthForm;
