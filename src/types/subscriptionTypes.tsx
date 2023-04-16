import { z } from "zod";

export const SubscriptionInputSchema = z.object({
  memberId: z.string().nonempty("Required"),
  movieId: z.string().nonempty("Required"),
  date: z.string().nonempty("Required"),
});

export type SubscriptionInputObject = z.infer<typeof SubscriptionInputSchema>;

const SubscriptionSchema = z.object({
  _id: z.string().optional(),
  memberId: z.string().nonempty("Required"),
  movies: z
    .array(z.object({ movieId: z.string(), date: z.string() }))
    .nonempty("Required"),
});

export type SubscriptionObject = z.infer<typeof SubscriptionSchema>;
