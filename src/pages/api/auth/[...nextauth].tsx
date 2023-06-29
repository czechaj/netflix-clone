import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prismaDb from "@/lib/prismadb";
import { compare } from "bcrypt";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Email and password are required");

        const user = await prismaDb.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("User doensn't exist");
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordCorrect) {
          throw new Error("Oassword is incorrect");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    // newUser: "/auth",
    /*  signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    */
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismaDb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
