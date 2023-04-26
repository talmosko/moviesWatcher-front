import { Control, Controller, useForm } from "react-hook-form";
import {
  AllPermissions,
  AllPermissionsDict,
  MoviesCUDPermissions,
  PermissionType,
  SubscriptionsCUDPermissions,
  UserObject,
  UserSchema,
} from "../../types/userTypes";
import Button from "../UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import FormField, { FieldLabel } from "../UI/FormField";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { addUser, updateUser } from "../../store/users-actions";
import Form from "../UI/Form";
import CardButtons from "../UI/CardButtons";
import Input from "../UI/Input";

type UserFormProps = {
  user?: UserObject;
};

const UserForm = (props: UserFormProps) => {
  const { user } = props;
  const isEdit = !!user;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error: submitError } = useAppSelector((state) => state.users);
  const { register, handleSubmit, control, formState } = useForm<UserObject>({
    defaultValues: isEdit ? user : undefined,
    resolver: zodResolver(UserSchema),
    mode: "all",
  });
  const { errors } = formState;

  const onSubmit = async (data: UserObject) => {
    if (isEdit) {
      dispatch(updateUser(data, user!._id as string));
    } else {
      dispatch(addUser(data));
    }
    if (!submitError) {
      navigate("/users", { replace: true });
    }
  };

  return (
    <Card className="flex-wrap flex-row gap-6">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField htmlFor="firstName" fieldLabel="First Name" errors={errors}>
          <Input type="text" {...register("firstName")} />
        </FormField>

        <FormField htmlFor="lastName" fieldLabel="Last Name" errors={errors}>
          <Input type="text" {...register("lastName")} />
        </FormField>

        <FormField htmlFor="userName" fieldLabel="User Name" errors={errors}>
          <Input type="text" {...register("userName")} />
        </FormField>

        <FormField
          htmlFor="sessionTimeout"
          fieldLabel="Session Timeout (Mins)"
          errors={errors}
        >
          <Input
            type="number"
            {...register("sessionTimeout", { valueAsNumber: true })}
          />
        </FormField>

        {isEdit && (
          <div className="flex flex-wrap gap-2">
            <FieldLabel className="self-center">Created Data:</FieldLabel>
            <p className="text-blue-800 self-center">
              {user.createdAt && new Date(user.createdAt).toLocaleDateString()}{" "}
            </p>
          </div>
        )}
        <PermissionsFields user={user} control={control} isEdit={isEdit} />
        <CardButtons>
          <Button type="submit">Save</Button>
          <Button
            type="button"
            onClick={() => navigate("/users", { replace: true })}
          >
            Cancel
          </Button>
        </CardButtons>
        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      </Form>
    </Card>
  );
};

type PermissionsFieldsProps = {
  user?: UserObject;
  control: Control<UserObject, any>;
  isEdit: boolean;
};

const PermissionsFields = ({
  user,
  control,
  isEdit,
}: PermissionsFieldsProps) => {
  const addNewPermission = (
    userPermissions: PermissionType[] | undefined,
    permission: PermissionType
  ) => {
    let newPermissions = userPermissions ? [...userPermissions] : [];
    if (!newPermissions.includes(permission)) newPermissions.push(permission);
    MoviesCUDPermissions.forEach((p) => {
      if (
        newPermissions.includes(p) &&
        !newPermissions.includes(AllPermissionsDict.ViewMovies)
      ) {
        newPermissions.push(AllPermissionsDict.ViewMovies);
      }
    });
    SubscriptionsCUDPermissions.forEach((p) => {
      if (
        newPermissions.includes(p) &&
        !newPermissions.includes(AllPermissionsDict.ViewSubscriptions)
      ) {
        newPermissions.push(AllPermissionsDict.ViewSubscriptions);
      }
    });

    return newPermissions;
  };

  const removePermission = (
    permissions: PermissionType[],
    permission: PermissionType
  ) => {
    let remove = true;
    MoviesCUDPermissions.forEach((p) => {
      if (
        permissions.includes(p) &&
        permission === AllPermissionsDict.ViewMovies
      ) {
        remove = false;
      }
    });
    SubscriptionsCUDPermissions.forEach((p) => {
      if (
        permissions.includes(p) &&
        permission === AllPermissionsDict.ViewSubscriptions
      ) {
        remove = false;
      }
    });

    if (remove) {
      return permissions.filter((p) => p !== permission);
    }
    return permissions;
  };

  const handlePermissionsChange = (
    checked: boolean,
    userPermissions: PermissionType[] | undefined,
    permission: PermissionType
  ) => {
    if (checked) {
      return addNewPermission(userPermissions, permission);
    } else {
      return removePermission(userPermissions!, permission);
    }
  };
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
                    onChange(
                      handlePermissionsChange(
                        e.target.checked,
                        userPermissions,
                        permission
                      )
                    );
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

export default UserForm;
