import { Controller, useForm } from "react-hook-form";
import Button from "../UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import { MovieObject, MovieSchema } from "../../types/movieTypes";
import FormField from "../UI/FormField";

const MovieForm = ({ movie }: { movie?: MovieObject }) => {
  const isEdit = !!movie;

  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
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
  const onSubmit = async (data: MovieObject) => {
    const address = `${import.meta.env.VITE_CINEMA_MOVIES_API}${
      isEdit ? `/${movie?._id}` : ""
    }`;
    try {
      const res = await axios(address, {
        method: isEdit ? "PUT" : "POST",
        data: { ...data, genres: data.genres?.filter((genre) => genre !== "") },
      });
      if (res.status === 200 || res.status === 201) {
        navigate("/movies", { replace: true });
      } else {
        //eslint-disable-next-line no-console
        console.log(res);
        setSubmitError("There was an error submitting the form");
      }
    } catch (error) {
      //eslint-disable-next-line no-console
      console.log(error);
      setSubmitError("There was an error submitting the form");
    }
  };

  return (
    <Card className="w-3/5 flex-wrap flex-row gap-6 sm:w-11/12">
      <form
        className="flex flex-wrap gap-2 flex-col rounded-md bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          htmlFor="name"
          fieldLabel="Name"
          register={register}
          errors={errors}
        />

        <Controller
          control={control}
          name="genres"
          defaultValue={isEdit ? movie.genres : [""]}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <>
                <FormField
                  htmlFor="genres"
                  fieldLabel="Genres"
                  onBlur={onBlur}
                  onChange={(e) => {
                    const { value: newString } = e.target as HTMLInputElement;
                    let newValue = newString.split(",");
                    onChange(newValue);
                  }}
                  value={value || []}
                  errors={errors}
                />
              </>
            );
          }}
        />

        <FormField
          htmlFor="image"
          fieldLabel="Image"
          errors={errors}
          register={register}
        />
        <FormField
          htmlFor="premiered"
          type="date"
          fieldLabel="Premiered Date"
          register={register}
          errors={errors}
        />

        <div className="flex flex-wrap gap-2 mt-4">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            onClick={() => navigate("/movies", { replace: true })}
          >
            Cancel
          </Button>
        </div>
        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      </form>
      <div className="order-first sm:order-last sm:h-80">
        <img
          className="border-2 border-blue-800 sm:max-h-full sm:w-auto sm:order-last rounded-md"
          src={watch()["image"]}
          alt={movie?.name}
        />
      </div>
    </Card>
  );
};

export default MovieForm;
