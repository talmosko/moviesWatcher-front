import { z } from "zod";

export const MemberSchema = z.object({
  _id: z.string().optional(),
  externalId: z.number().optional(),
  name: z.string().nonempty("Required"),
  email: z.string().email("Invalid email"),
  city: z.string().nonempty("Required"),
});

export type MemberObject = z.infer<typeof MemberSchema>;
   