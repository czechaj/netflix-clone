import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Logo } from "@/components/icons";

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <div className="h-full w-full px-12 py-5">
      <nav className="flex justify-between items-center">
        <Logo />
        <button onClick={() => signOut()} className="bg-white rounded-sm px-2">
          Sign out
        </button>
      </nav>
      <main className="mt-12">
        <p className="text-white">Hello {user?.email}</p>
      </main>
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
