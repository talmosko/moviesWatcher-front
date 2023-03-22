import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MovieObject } from "../../types/movieTypes";
import Card, { CardSubTitle, CardTitle } from "../UI/Card";
import EntityButtons from "../UI/EntityButtons";

const Movie = ({ movie }: { movie: MovieObject }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/movies/${movie._id}`);
  };

  const handleDelete = async () => {
    try {
      const address = `${import.meta.env.VITE_CINEMA_MOVIES_API}/${movie._id}`;
      const res = await axios.delete(address);
      if (res.status === 200) {
        //TODO: something more elegant with store
        navigate(0);
      } else {
        //eslint-disable-next-line no-console
        console.log(res);
      }
    } catch (error) {
      //eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Card className="sm:w-80 gap-2">
      <div className="w-40 flex">
        <img src={movie.image} className="self-center" alt={movie.name} />
      </div>
      <div className="flex flex-col w-full">
        <CardTitle>{`${movie.name}, ${movie.premiered?.substring(
          0,
          4
        )}`}</CardTitle>
        <CardSubTitle>{movie.genres?.join(", ")}</CardSubTitle>
        <EntityButtons onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </Card>
  );
};

export default Movie;
