import { Movie } from "@prisma/client";
import { FC } from "react";
import { MovieCard } from "../movie-card";

type Props = {
  data: Movie[];
  title: string;
};

export const MovieList: FC<Props> = (props) => {
  const { data: movieList, title } = props;

  if (!movieList) return null;
  return (
    <div className="flex-col gap-6 p-4 mt-8">
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {movieList.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </div>
      {}
    </div>
  );
};
