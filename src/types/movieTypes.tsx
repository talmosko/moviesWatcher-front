import { z } from "zod";

export const MovieSchema = z.object({
  _id: z.string().optional(),
  externalId: z.number().optional(),
  name: z.string().nonempty("Required"),
  genres: z.array(z.string()).nonempty("Required"),
  image: z.string().nonempty("Required"),
  premiered: z.string().nonempty("Required"),
});

export type MovieObject = z.infer<typeof MovieSchema>;
