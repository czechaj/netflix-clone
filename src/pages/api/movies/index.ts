// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import serverAuth from "@/lib/serverAuth";
import prismaDb from "@/lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);

    const movies = await prismaDb.movie.findMany();

    return res.status(200).json(movies);
    return;
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
}
