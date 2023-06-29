import { useState, useMemo, useCallback, FC } from "react";
import axios from "axios";
import { CheckIcon, PlusIcon } from "../icons";
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from "@prisma/client";

type Props = {
  movieId: string;
};

export const FavoriteButton: FC<Props> = (props) => {
  const { movieId } = props;
  console.log("🚀 ~ movieId:", movieId);

  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate: mutateUser } = useCurrentUser();

  const isInFavorites = useMemo(() => {
    return currentUser?.favoriteIds?.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isInFavorites) {
      response = await axios.delete(`/api/favorite?movieId=${movieId}`);
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updatedFavorites = response?.data?.favoriteIds;

    mutateUser({ ...(currentUser as User), favoriteIds: updatedFavorites });
    mutateFavorites();
  }, [movieId, currentUser, isInFavorites, mutateFavorites, mutateUser]);

  return (
    <div
      onClick={toggleFavorites}
      className="text-white border-[3.5px] hover:text-neutral-400 hover:border-neutral-400 transition rounded-full flex items-center justify-center"
    >
      {isInFavorites ? <CheckIcon /> : <PlusIcon />}
    </div>
  );
};
