import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export default function Profiles() {
  return (
    <div>
      <p>Profiles</p>
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
