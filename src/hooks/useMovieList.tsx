import useSwr from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@prisma/client";

const useMovieList = () => {
  const { data, error, isLoading } = useSwr<Movie[]>("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading };
};

export default useMovieList;
