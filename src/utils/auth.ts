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
    console.log("authLoader", permission);
    //get permissions from local storage
    const permissions = getPermissions();
    console.log("permissions", permissions);
    if (!permissions || !permissions.includes(permission)) {
      return redirect("/login");
    }

    if (nextLoader) return await nextLoader(args);

    return {};
  };
};
