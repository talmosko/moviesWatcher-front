import {
  Control,
  Controller,
  FieldErrors,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import {
  AllPermissions,
  MoviesCUDPermissions,
  PermissionType,
  SubscriptionsCUDPermissions,
  UserObject,
  UserSchema,
  ViewMoviesPermission,
  ViewSubscriptionPermission,
} from "../types/userTypes";
import Button from "./UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "./UI/ErrorMessage";

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
      <form
        className="flex flex-wrap gap-2 flex-col w-3/5 rounded-md bg-white p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <UserField
          htmlFor="firstName"
          fieldLabel="First Name"
          register={register}
          errors={errors}
        />
        <UserField
          htmlFor="lastName"
          fieldLabel="Last Name"
          register={register}
          errors={errors}
        />
        <UserField
          htmlFor="userName"
          fieldLabel="User Name"
          errors={errors}
          register={register}
        />
        <UserField
          htmlFor="sessionTimeout"
          type="number"
          fieldLabel="Session Timeout (Mins)"
          register={register}
          errors={errors}
        />

        {isEdit && (
          <div className="flex flex-wrap gap-2">
            <FieldLabel className="self-center">Created Data:</FieldLabel>
            <p className="text-blue-800 self-center">
              {user.createdAt?.toLocaleDateString()}
            </p>
          </div>
        )}
        <PermissionsFields user={user} control={control} isEdit={isEdit} />
        <div className="flex flex-wrap gap-2 mt-4">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            onClick={() => navigate("/users", { replace: true })}
          >
            Cancel
          </Button>
        </div>
        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      </form>
    </div>
  );
};

type PermissionsFieldsProps = {
  user?: UserObject;
  control: Control<UserObject, any>;
  isEdit: boolean;
};

const addMissingPermissions = (
  userPermissions: PermissionType[] | undefined,
  permission: PermissionType
) => {
  let newPermissions = userPermissions ? [...userPermissions] : [];
  newPermissions.push(permission);
  if (
    MoviesCUDPermissions.includes(
      permission as typeof MoviesCUDPermissions[number]
    )
  )
    newPermissions.push(ViewMoviesPermission);

  if (
    SubscriptionsCUDPermissions.includes(
      permission as typeof SubscriptionsCUDPermissions[number]
    )
  )
    newPermissions.push(ViewSubscriptionPermission);

  return newPermissions;
};

const PermissionsFields = ({
  user,
  control,
  isEdit,
}: PermissionsFieldsProps) => {
  return (
    <div className="flex flex-col mt-4">
      <FieldLabel htmlFor="permissions">Permissions</FieldLabel>
      <Controller
        control={control}
        name="permissions"
        defaultValue={isEdit ? user!.permissions : []}
        render={({ field: { onChange, onBlur, value: userPermissions } }) => (
          <>
            {AllPermissions.map((permission, key) => (
              <div className="flex gap-1" key={permission}>
                <input
                  key={permission + "input"}
                  type="checkbox"
                  name={permission}
                  checked={userPermissions?.includes(permission) || false}
                  onChange={(e) => {
                    const { checked } = e.target as HTMLInputElement;
                    if (checked) {
                      onChange(
                        addMissingPermissions(userPermissions, permission)
                      );
                    } else {
                      onChange(
                        userPermissions?.filter(
                          (r: PermissionType) => r !== permission
                        )
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
    </div>
  );
};

type UserFieldProps = {
  htmlFor: keyof UserObject;
  fieldLabel: string;
  type?: string;
  register: UseFormRegister<UserObject>;
  errors: FieldErrors<UserObject>;
};

const UserField = ({
  htmlFor,
  fieldLabel,
  type = "text",
  register,
  errors,
}: UserFieldProps) => {
  return (
    <div className="w-80 grid grid-cols-2 grid-rows-2">
      <FieldLabel
        className="self-center col-start-1 col-end-2 row-start-1 "
        htmlFor={htmlFor}
      >
        {fieldLabel}
      </FieldLabel>
      {errors[htmlFor] && (
        <ErrorMessage className="self-center justify-self-end col-start-2 col-end-3 row-start-1">
          {errors[htmlFor]!.message}
        </ErrorMessage>
      )}
      <input
        className="border  p-2 rounded-md col-start-1 col-end-3 row-start-2 w-80 h-8 border-blue-800 text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
        type={type}
        {...register(htmlFor, {
          required: true,
          valueAsNumber: type === "number",
        })}
      />
    </div>
  );
};

const FieldLabel = ({
  htmlFor,
  children,
  className,
}: React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>) => {
  return (
    <label
      className={`font-medium text-xs text-gray-600 ${className}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default UserForm;
