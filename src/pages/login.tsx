import { SessionStatus } from "@/types/sessionStatus";
import { Session } from "inspector";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      console.log(providers);
    })();
  }, []);

  if (
    status !== SessionStatus.LOADING &&
    status === SessionStatus.AUTHENTICATED
  ) {
    router.push("/");
  }

  return (
    <div>
      <h1>Login</h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signIn("github")}
        // onClick={() => router.push("/api/auth/signin/github")}
      >
        {" "}
        Sign In With Github
      </button>
    </div>
  );
}

export default LoginPage;
