import { Movie } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { PlayIcon } from "@/components/icons";
import { FavoriteButton } from "../favorite-button";

type Props = {
  data: Movie;
};

export const MovieCard: FC<Props> = (props) => {
  const { data: movie } = props;

  if (!movie) return null;
  return (
    <div className="relative bg-zinc-900 group col-span-1 flex w-full h-[12vh] rounded-lg shadow-lg">
      <Image
        width={300}
        height={140}
        src={movie.thumbnailUrl}
        className="group-hover:opacity-80 cursor-pointer object-cover transition duration-150 delay-200 rounded-md shadow-xl"
        alt="movie"
      />

      <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:opacity-100">
        <Image
          width={300}
          height={140}
          src={movie.thumbnailUrl}
          className="cursor-pointer w-full object-cover rounded-md shadow-xl"
          alt="movie"
        />
        <div className="flex flex-col gap-3  z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex gap-4">
            <span
              onClick={() => {}}
              className="text-white w-fit cursor-pointer hover:text-neutral-400 transition"
            >
              <PlayIcon />
            </span>
            <span
              onClick={() => {}}
              className="text-white w-fit cursor-pointer hover:text-neutral-400 transition"
            >
              <FavoriteButton movieId={movie.id} />
            </span>
          </div>
          <p className="text-green-400">
            New <span className="text-white">2023 </span>
          </p>
          <p className="text-white">{movie.duration}</p>
          <p className="text-white text-sm">{movie.genre}</p>
        </div>
      </div>
    </div>
  );
};
