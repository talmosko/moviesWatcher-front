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
    <Card className="w-3/5 flex-col">
      <form
        className="flex flex-wrap gap-2 flex-col rounded-md bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          htmlFor="name"
          fieldLabel="Name"
          register={register}
          errors={errors}
        />
        <FormField
          htmlFor="email"
          fieldLabel="Email"
          register={register}
          errors={errors}
        />
        <FormField
          htmlFor="city"
          fieldLabel="City"
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

export default MemberForm;
