import { LoaderFunction, LoaderFunctionArgs, redirect } from "react-router-dom";
import { PermissionType } from "../types/userTypes";

export function getSessionTimeout() {
  const sessionTimeout = localStorage.getItem("sessionTimeout") as
    | number
    | null;
  return sessionTimeout;
}

export function getPermissions() {
  const permissions = localStorage.getItem("permissions") as
    | PermissionType[]
    | null;
  return permissions;
}

//generic auth loader
export const authLoader = (
  permission: PermissionType,
  nextLoader?: LoaderFunction
) => {
  return async (args: LoaderFunctionArgs) => {
    //get permissions from local storage
    const permissions = getPermissions();
    if (!permissions || !permissions.includes(permission)) {
      return redirect("/unauthorized");
    }

    //sending nextLoader
    if (nextLoader) {
      const res = await nextLoader(args);
      return { ...res, permissions };
    }

    return { permissions };
  };
};
