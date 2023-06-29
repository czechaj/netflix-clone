import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Navbar } from "@/components/navbar";

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <div className="h-full w-full px-12 py-5">
      <Navbar />
      <div></div>
      {/*  <main className="mt-12">
        <p className="text-white">Hello {user?.email}</p>
      </main> */}
    </div>
  );
}

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
    props: {},
  };
}
