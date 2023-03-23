import { z } from "zod";

export const SubscriptionInputSchema = z.object({
  memberId: z.string(),
  movieId: z.string(),
  date: z.string(),
});

export type SubscriptionInputObject = z.infer<typeof SubscriptionInputSchema>;
