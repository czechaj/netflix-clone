import { InferGetServerSidePropsType, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { Navbar } from "@/components/navbar";
import useBillboard from "@/hooks/useBillboard";
import { InfoIcon } from "@/components/icons";
import useMovieList from "@/hooks/useMovieList";
import { MovieList } from "@/components/movie-list";
import useFavorites from "@/hooks/useFavorites";

export default function Home({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: movieList = [] } = useMovieList();
  const { data: favoriteMovies = [] } = useFavorites();

  return (
    <>
      <Navbar userName={session.user?.name || ""} />
      <Billboard />
      <MovieList data={movieList} title="Trending Now" />
      <MovieList data={favoriteMovies} title="Favorites" />
    </>
  );
}

const Billboard = () => {
  const { data: billboard, isLoading } = useBillboard();

  if (isLoading) return <div className="h-[56.25vh]" />;
  if (!billboard) return null;
  return (
    <div className="relative h-[56.25vh] ">
      <video
        className="w-full object-cover h-[56.25vh] brightness-[60%]"
        autoPlay
        loop
        muted
        poster={billboard?.thumbnailUrl}
        src={billboard?.videoUrl}
      ></video>
      <div className="absolute top-1/2 -translate-y-1/2 ml-4 md:ml-16">
        <p className="text-white text-xl md:text-5xl lg:text-6xl h-full w-1/2 font-bold drop-shadow-xl">
          {billboard?.title}
        </p>
        <p className="text-white text-lg md:text-xl lg:text-2xl h-full w-9/10 lg:w-1/2 font-normal drop-shadow-lg mt-8">
          {billboard?.description}
        </p>
        <div className="mt-3 lg:mt-4">
          <button className="flex items-center bg-white hover:bg-opacity-20 transition text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-3 w-auto text-xs lg:text-lg">
            <span className="">
              <InfoIcon />
            </span>
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
