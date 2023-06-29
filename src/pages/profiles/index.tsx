import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";

export default function Profiles() {
  const { data: user } = useCurrentUser();
  const router = useRouter();
  return (
    <div className="h-full items-center flex-col flex justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl text-white">Who is watching?</h1>
      </div>
      <div className="flex justify-center items-center gap-6 group mt-10">
        <div
          onClick={() => router.push("/")}
          className="flex group-hover:cursor-pointer flex-col gap-6 "
        >
          <div className="w-32 group-hover:border rounded-md transition">
            <Image
              width={200}
              height={200}
              alt="avatar"
              className="rounded-md"
              src={"/images/avatar-3.png"}
            />
          </div>
          <div>
            <p className="leading-3 text-center text-white">{user?.name}</p>
          </div>
        </div>
      </div>
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
