import useSwr from "swr";
import fetcher from "@/lib/fetcher";
import { User } from "@prisma/client";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate, isValidating } = useSwr<User>(
    "/api/current",
    fetcher
  );

  return { data, error, isLoading, mutate, isValidating };
};

export default useCurrentUser;
