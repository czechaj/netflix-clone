// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import serverAuth from "@/lib/serverAuth";
import prismaDb from "@/lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentUser } = await serverAuth(req, res);
  try {
    if (req.method === "POST") {
      const { movieId } = req.body;
      const isMovieExist = await prismaDb.movie.findUnique({
        where: { id: movieId },
      });

      if (!isMovieExist) {
        throw new Error("Invalid movie id");
      }

      const updatedUser = await prismaDb.user.update({
        where: { email: currentUser.email as string },
        data: { favoriteIds: { push: movieId } },
      });

      return res.status(200).json(updatedUser);
    }
    if (req.method === "DELETE") {
      const { movieId } = req.query;

      const isMovieExist = await prismaDb.movie.findUnique({
        where: { id: (movieId as string) || "" },
      });

      if (!isMovieExist) {
        throw new Error("Invalid movie id");
      }

      const updatedFavorites = currentUser.favoriteIds?.filter(
        (fav) => fav !== movieId
      );

      const updatedUser = await prismaDb.user.update({
        where: { email: currentUser.email as string },
        data: { favoriteIds: { set: updatedFavorites } },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
}
