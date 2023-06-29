import useSwr from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@prisma/client";

const useMovie = (movieId?: string) => {
  const key = movieId ? `/api/movies/${movieId}` : null;

  const { data, error, isLoading } = useSwr<Movie>(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading };
};

export default useMovie;
