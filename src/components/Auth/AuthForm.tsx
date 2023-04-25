import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionData, useNavigation, useSubmit } from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import FormField from "../UI/FormField";
import { AuthObject, AuthSchema } from "../../types/userTypes";
import EntityButtons from "../UI/CardButtons";
import Form from "../UI/Form";
import Input from "../UI/Input";

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
    console.log(formData);
    submit(
      { ...formData, isSignup: `${isSignup}` },
      { method: "post", replace: true }
    );

    reset();
  };

  return (
    <Card>
      {data && data.message && <ErrorMessage>{data.message}</ErrorMessage>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField htmlFor="userName" fieldLabel="User Name" errors={errors}>
          <Input {...register("userName")} />
        </FormField>

        <FormField htmlFor="password" fieldLabel="Password" errors={errors}>
          <Input {...register("password")} type="password" />
        </FormField>

        <EntityButtons>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : isSignup ? "Sign Up" : "Login"}
          </Button>
        </EntityButtons>
      </Form>
    </Card>
  );
};

export default AuthForm;
