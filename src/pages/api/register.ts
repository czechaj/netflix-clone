import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaDb from "@/lib/prismadb";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, name, password } = req.body;
    const existingUser = await prismaDb.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(422).json({ message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismaDb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(201).json(user);
  } catch (e) {
    console.error(e);
  }
}
