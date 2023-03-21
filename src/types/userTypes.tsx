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

export const SubscriptionsCUDPermissions = [
  AllPermissions[1],
  AllPermissions[2],
  AllPermissions[3],
] as const;

export const ViewSubscriptionPermission = AllPermissions[0];

export const MoviesCUDPermissions = [
  AllPermissions[5],
  AllPermissions[6],
  AllPermissions[7],
] as const;

export const ViewMoviesPermission = AllPermissions[4];

export const PermissionsTypesSchema = z.enum(AllPermissions);

export type PermissionType = z.infer<typeof PermissionsTypesSchema>;

export const UserSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string().nonempty("Required"),
  lastName: z.string().nonempty("Required"),
  userName: z.string().email("Invalid email"),
  fullName: z.string().optional(),
  createdAt: z.date().optional(),
  sessionTimeout: z.number().nonnegative("Must be a positive number"),
  permissions: z.array(PermissionsTypesSchema).optional(),
  password: z.string().nonempty().optional(),
});

export type UserObject = z.infer<typeof UserSchema>;
