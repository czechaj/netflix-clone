// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import serverAuth from "@/lib/serverAuth";
import prismaDb from "@/lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    const usersFavorites = await prismaDb.movie.findMany({
      where: { id: { in: currentUser.favoriteIds } },
    });

    return res.status(200).json(usersFavorites);
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
}
