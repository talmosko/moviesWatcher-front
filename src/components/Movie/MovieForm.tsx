import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import Button from "../UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import { MovieObject, MovieSchema } from "../../types/movieTypes";
import FormField from "../UI/FormField";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { addMovie, updateMovie } from "../../store/movie-actions";
import Form from "../UI/Form";
import CardButtons from "../UI/CardButtons";
import Input from "../UI/Input";

const MovieForm = ({ movie }: { movie?: MovieObject }) => {
  const isEdit = !!movie;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error: submitError } = useAppSelector((state) => state.movies);

  const { register, handleSubmit, formState, control, watch } =
    useForm<MovieObject>({
      defaultValues: isEdit
        ? {
            ...movie,
            premiered: movie?.premiered?.slice(0, 10),
          }
        : undefined,
      resolver: zodResolver(MovieSchema),
      mode: "all",
    });

  const { errors } = formState;

  const onSubmit = (data: MovieObject) => {
    if (isEdit) {
      dispatch(updateMovie(data, movie?._id as string));
    } else {
      dispatch(addMovie(data));
    }
    if (!submitError) {
      navigate("/movies", { replace: true });
    }
  };

  return (
    <Card className="flex-wrap flex-row gap-6">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField htmlFor="name" fieldLabel="Name" errors={errors}>
          <Input {...register("name")} />
        </FormField>

        <GenresField
          control={control}
          isEdit={isEdit}
          genres={movie?.genres || [""]}
          errors={errors}
        />

        <FormField htmlFor="image" fieldLabel="Image" errors={errors}>
          <Input {...register("image")} />
        </FormField>

        <FormField
          htmlFor="premiered"
          fieldLabel="Premiered Date"
          errors={errors}
        >
          <Input type="date" {...register("premiered")} />
        </FormField>

        <CardButtons>
          <Button type="submit">Save</Button>
          <Button
            type="button"
            onClick={() => navigate("/movies", { replace: true })}
          >
            Cancel
          </Button>
        </CardButtons>
        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      </Form>
      <div className="order-first sm:order-last sm:h-80 h-60">
        {/* //TODO : Add image preview */}
        {watch()["image"] && (
          <img
            className="border-2 border-blue-800 max-h-full w-auto rounded-md"
            src={watch()["image"]}
            alt={movie?.name}
          />
        )}
      </div>
    </Card>
  );
};

const GenresField = ({
  control,
  isEdit,
  genres,
  errors,
}: {
  control: Control<MovieObject, any>;
  isEdit: boolean;
  genres: MovieObject["genres"];
  errors: FieldErrors<MovieObject>;
}) => {
  return (
    <Controller
      control={control}
      name="genres"
      defaultValue={isEdit ? genres : [""]}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <FormField htmlFor="genres" fieldLabel="Genres" errors={errors}>
            <Input
              type="text"
              name="genres"
              onBlur={onBlur}
              onChange={(e) => {
                const { value: newString } = e.target as HTMLInputElement;
                let newValue = newString.split(",");
                onChange(newValue);
              }}
              value={value || []}
            />
          </FormField>
        );
      }}
    />
  );
};

export default MovieForm;
  