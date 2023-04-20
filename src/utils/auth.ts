import { redirect } from "react-router-dom";
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
export const authLoader = (permission: PermissionType) => {
  return () => {
    //get permissions from local storage
    const permissions = getPermissions();

    if (!permissions || !permissions.includes(permission)) {
      redirect("/login");
    }
  };
};
