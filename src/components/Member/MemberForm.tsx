import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import FormField from "../UI/FormField";
import { MemberObject, MemberSchema } from "../../types/memberTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { addMember, updateMember } from "../../store/member-actions";
import Form from "../UI/Form";
import CardButtons from "../UI/CardButtons";
import Input from "../UI/Input";

type MemberFormProps = {
  member?: MemberObject;
};

const MemberForm = ({ member }: MemberFormProps) => {
  const isEdit = !!member;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error: submitError } = useAppSelector((state) => state.members);

  const { register, handleSubmit, formState } = useForm<MemberObject>({
    defaultValues: isEdit ? member : undefined,
    resolver: zodResolver(MemberSchema),
    mode: "all",
  });

  const { errors } = formState;

  const onSubmit = (data: MemberObject) => {
    if (isEdit) {
      dispatch(updateMember(data, member!._id as string));
    } else {
      dispatch(addMember(data));
    }
    if (!submitError) {
      navigate("/members", { replace: true });
    }
  };

  return (
    <Card className="flex-wrap flex-row gap-6">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField htmlFor="name" fieldLabel="Name" errors={errors}>
          <Input type="text" {...register("name")} />
        </FormField>
        <FormField htmlFor="email" fieldLabel="Email" errors={errors}>
          <Input type="text" {...register("email")} />
        </FormField>
        <FormField htmlFor="city" fieldLabel="City" errors={errors}>
          <Input type="text" {...register("city")} />
        </FormField>

        <CardButtons>
          <Button
            type="button"
            onClick={() => navigate("/members", { replace: true })}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </CardButtons>
        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      </Form>
    </Card>
  );
};

export default MemberForm;
