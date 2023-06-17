import { SessionStatus } from "@/types/sessionStatus";

import { getServerSession } from "next-auth";
import { Session } from "next-auth/core/types";
import {
  GetSessionParams,
  getSession,
  useSession,
  signOut,
} from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { UserSession } from "@/types/userSession";

interface Props {
  user: UserSession;
}

function HomePage({ user }: Props) {
  console.log(user);
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // if (status === "loading")
  //   return (
  //     <div>
  //       <p>Loading...</p>
  //     </div>
  //   );

  // if (status === SessionStatus.UNAUTHENTICATED) {
  //   router.push("/login");
  //   return (
  //     <div>
  //       <p>Redirecting...</p>
  //     </div>
  //   );
  // }
  return (
    <div>
      {user ? (
        <div>
          <h1>{user?.name}</h1>
          <h4>{user?.email}</h4>
          <Image
            src={user?.image!}
            alt="user image"
            width={300}
            height={300}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p>Skeleton....</p>
      )}
    </div>

    // <div>
    //   {session ? (
    //     <div>
    //       <h1>{session?.user?.name}</h1>
    //       <h4>{session?.user?.email}</h4>
    //       <Image
    //         src={session?.user?.image!}
    //         alt="user image"
    //         width={300}
    //         height={300}
    //       />
    //     </div>
    //   ) : (
    //     <p>Skeleton....</p>
    //   )}
    // </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default HomePage;

// import {
//   GetSessionParams,
//   getSession,
//   signIn,
//   signOut,
//   useSession,
// } from "next-auth/react";
// import type { Session } from "next-auth";
// import { useEffect, useState } from "react";

// interface Props {
//   session: Session | null;
// }

// export default function Home({ session }: Props) {
// const [session, setSession] = useState<Session | null>(null);
// useEffect(() => {
//   (async () => {
//     const session = await getSession();
//     setSession(session);
//     console.log(session);
//   })();
// }, []);
//   return <div>hola</div>;
// }

// el enrutador app no sporta getServerSideProps getStaticProps getInitialProps sinembargo el enrutador pages si

// export const getServerSideProps = async (
//   context: GetSessionParams | undefined
// ) => {
//   const session = await getSession(context);
//   return {
//     props: {
//       session,
//     },
//   };
// };
