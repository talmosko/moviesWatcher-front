import { z } from "zod";

export const MovieSubscriptionSchema = z.object({
  _id: z.string().optional(),
  memberId: z.string(),
  date: z.date(),
});

export type MovieSubscriptionObject = z.infer<typeof MovieSubscriptionSchema>;

//how to solve the "was used beg"
export const MovieSchema = z.object({
  _id: z.string().optional(),
  externalId: z.number().optional(),
  name: z.string().nonempty("Required"),
  genres: z.array(z.string()).nonempty("Required"),
  image: z.string().nonempty("Required"),
  premiered: z.string().nonempty("Required"),
  subscriptions: z.array(MovieSubscriptionSchema),
});

export type MovieObject = z.infer<typeof MovieSchema>;
