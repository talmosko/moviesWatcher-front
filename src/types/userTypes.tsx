import { z } from "zod";

export const AllPermissions = [
  "View Subscriptions",
  "Create Subscriptions",
  "Update Subscriptions",
  "Delete Subscriptions",
  "View Movies",
  "Create Movies",
  "Update Movies",
  "Delete Movies",
  "Site Admin",
] as const;

export const PermissionsTypesSchema = z.enum(AllPermissions);

export type PermissionType = z.infer<typeof PermissionsTypesSchema>;

export const AllPermissionsDict = {
  ViewSubscriptions: AllPermissions[0],
  CreateSubscriptions: AllPermissions[1],
  UpdateSubscriptions: AllPermissions[2],
  DeleteSubscriptions: AllPermissions[3],
  ViewMovies: AllPermissions[4],
  CreateMovies: AllPermissions[5],
  UpdateMovies: AllPermissions[6],
  DeleteMovies: AllPermissions[7],
  SiteAdmin: AllPermissions[8],
};

export const SubscriptionsCUDPermissions = [
  AllPermissionsDict.CreateSubscriptions,
  AllPermissionsDict.UpdateSubscriptions,
  AllPermissionsDict.DeleteSubscriptions,
] as const;

export const MoviesCUDPermissions = [
  AllPermissionsDict.CreateMovies,
  AllPermissionsDict.UpdateMovies,
  AllPermissionsDict.DeleteMovies,
] as const;

export const UserSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string().nonempty("Required"),
  lastName: z.string().nonempty("Required"),
  userName: z.string().email("Invalid email"),
  fullName: z.string().optional(),
  createdAt: z.string().optional(),
  sessionTimeout: z.number().nonnegative("Must be a positive number"),
  permissions: z.array(PermissionsTypesSchema).optional(),
  password: z.string().nonempty().optional(),
});

export type UserObject = z.infer<typeof UserSchema>;

export const AuthSchema = z.object({
  userName: z.string().email("Invalid email").nonempty("Required"),
  password: z.string().nonempty(),
});

export type AuthObject = z.infer<typeof AuthSchema>;
   