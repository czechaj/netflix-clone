import useSwr from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@prisma/client";

const useFavorites = () => {
  const { data, error, isLoading, mutate, isValidating } = useSwr<Movie[]>(
    "/api/favorites",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading, mutate, isValidating };
};

export default useFavorites;
