import { z } from "zod";
import { MemberSchema } from "./memberTypes";
import { MovieSchema } from "./movieTypes";

export const SubscriptionInputSchema = z.object({
  memberId: z.string().nonempty("Required"),
  movieId: z.string().nonempty("Required"),
  date: z.string().nonempty("Required"),
});

export type SubscriptionInputObject = z.infer<typeof SubscriptionInputSchema>;

const SubscriptionSchema = z.object({
  _id: z.string(),
  memberId: z.object({
    _id: MemberSchema.shape._id,
    name: MemberSchema.shape.name,
  }),
  movies: z.array(
    z.object({
      movieId: z.object({
        _id: MovieSchema.shape._id,
        name: MovieSchema.shape.name,
      }),
      date: z.string(),
    })
  ),
});

export type SubscriptionObject = z.infer<typeof SubscriptionSchema>;

const SubscriptionForMovieSchema = z.object({
  memberId: SubscriptionSchema.shape.memberId,
  _id: SubscriptionSchema.shape._id,
  date: SubscriptionSchema.shape.movies.element.shape.date,
});

export type SubscriptionForMovieObject = z.infer<
  typeof SubscriptionForMovieSchema
>;
    