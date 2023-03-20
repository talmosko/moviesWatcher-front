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

export const UserSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  userName: z.string().email(),
  fullName: z.string().optional(),
  createdAt: z.date().optional(),
  sessionTimeout: z.number().nonnegative(),
  permissions: z.array(PermissionsTypesSchema).optional(),
  password: z.string().nonempty().optional(),
});

export type UserObject = z.infer<typeof UserSchema>;
