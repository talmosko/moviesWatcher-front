import { z } from "zod";
import { MovieSchema } from "./movieTypes";

export const MemberSubscriptionSchema = z.object({
  _id: z.string().optional(),
  memberId: z.string().optional(),
  movies: z
    .array(z.object({ movieId: MovieSchema, date: z.date() }))
    .optional(),
});

export type MemberSubscriptionObject = z.infer<typeof MemberSubscriptionSchema>;

export const MemberSchema = z.object({
  _id: z.string().optional(),
  externalId: z.number().optional(),
  name: z.string().nonempty("Required"),
  email: z.string().email("Invalid email"),
  city: z.string().nonempty("Required"),
  subscriptions: z.array(MemberSubscriptionSchema).optional(),
});

export type MemberObject = z.infer<typeof MemberSchema>;
