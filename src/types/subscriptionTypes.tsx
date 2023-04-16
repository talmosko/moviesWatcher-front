import { z } from "zod";

export const SubscriptionInputSchema = z.object({
  memberId: z.string().nonempty("Required"),
  movieId: z.string().nonempty("Required"),
  date: z.string().nonempty("Required"),
});

export type SubscriptionInputObject = z.infer<typeof SubscriptionInputSchema>;
