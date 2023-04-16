import { z } from "zod";
export const MemberSubscriptionSchema = z.object({
  _id: z.string().optional(),
  movies: z
    .array(
      z.object({
        movieId: z.object({ _id: z.string(), name: z.string() }),
        date: z.string(),
      })
    )
    .optional(),
});

export type MemberSubscriptionObject = z.infer<typeof MemberSubscriptionSchema>;

export const MemberSchema = z.object({
  _id: z.string().optional(),
  externalId: z.number().optional(),
  name: z.string().nonempty("Required"),
  email: z.string().email("Invalid email"),
  city: z.string().nonempty("Required"),
  subscriptions: MemberSubscriptionSchema.optional(),
});

export type MemberObject = z.infer<typeof MemberSchema>;
