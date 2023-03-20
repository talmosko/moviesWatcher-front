import { Controller, useForm } from "react-hook-form";
import { AllPermissions, UserObject, UserSchema } from "../types/userTypes";
import Button from "./UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type UserFormProps = {
  user?: UserObject;
};

const UserForm = (props: UserFormProps) => {
  const { user } = props;
  const isEdit = !!user;
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, control, formState } = useForm<UserObject>({
    defaultValues: isEdit ? user : undefined,
    resolver: zodResolver(UserSchema),
    mode: "all",
  });
  const { errors } = formState;

  const onSubmit = async (data: UserObject) => {
    const address = `${import.meta.env.VITE_CINEMA_USERS_API}${
      isEdit ? `/${user?._id}` : ""
    }`;
    try {
      const res = await axios(address, {
        method: isEdit ? "PUT" : "POST",
        data,
      });
      if (res.status === 200 || res.status === 201) {
        navigate("/users", { replace: true });
      } else {
        //eslint-disable-next-line no-console
        console.log(res);
        setSubmitError("There was an error submitting the form");
      }
    } catch (error) {
      //eslint-disable-next-line no-console
      console.log(error);
      setSubmitError("There was an error submitting the form");
    }
  };
  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" {...register("firstName", { required: true })} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <label htmlFor="lastName">Last Name</label>
        <input type="text" {...register("lastName", { required: true })} />
        <label htmlFor="userName">User Name</label>
        <input type="text" {...register("userName", { required: true })} />
        <label htmlFor="sessionTimeout">Session Time Out (Mins)</label>
        <input
          type="number"
          {...register("sessionTimeout", {
            required: true,
            valueAsNumber: true,
          })}
        />
        {isEdit && <p>Created Data: user.createdAt?.toLocaleDateString()</p>}
        <label htmlFor="permissions">Permissions</label>
        <Controller
          control={control}
          name="permissions"
          defaultValue={isEdit ? user.permissions : []}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              {AllPermissions.map((permission, key) => (
                <div key={permission}>
                  <input
                    key={permission + "input"}
                    type="checkbox"
                    name={permission}
                    checked={value?.includes(permission) || false}
                    onChange={(e) => {
                      const { checked } = e.target as HTMLInputElement;
                      if (checked) {
                        onChange(value ? [...value, permission] : [permission]);
                      } else {
                        onChange(
                          value?.filter((r: string) => r !== permission)
                        );
                      }
                    }}
                    onBlur={onBlur}
                  />
                  <label key={permission + "label"} htmlFor={permission}>
                    {permission}
                  </label>
                </div>
              ))}
            </>
          )}
        />

        <Button type="submit">Save</Button>
        <Button
          type="button"
          onClick={() => navigate("/users", { replace: true })}
        >
          Cancel
        </Button>
        {submitError && <p>{submitError}</p>}
      </form>
    </div>
  );
};

export default UserForm;
