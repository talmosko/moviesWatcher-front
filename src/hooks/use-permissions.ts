import { AllPermissionsDict, PermissionType } from "../types/userTypes";
import { getPermissions } from "../utils/auth";

type PermissionDict = { [K in keyof typeof AllPermissionsDict]: boolean };

export const usePermissions = () => {
  const permissions = (getPermissions() as PermissionType[]) || null;
  if (!permissions) return {} as PermissionDict;
  const permissionDict: PermissionDict = Object.keys(AllPermissionsDict).reduce(
    (acc, key) => {
      const permissionKey = key as keyof typeof AllPermissionsDict; // type assertion
      acc[permissionKey] = permissions.includes(
        AllPermissionsDict[permissionKey]
      );
      return acc;
    },
    {} as PermissionDict
  );

  return permissionDict;
};
 