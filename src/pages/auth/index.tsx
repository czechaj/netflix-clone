import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { GithubIcon, GoogleIcon, Logo } from "@/components/icons";
import { Input } from "@/components/ui-elements";
import { signIn } from "next-auth/react";
import axios from "axios";

export default function AuthPage() {
  const router = useRouter();

  const [mail, setMail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  const toggleMode = useCallback(
    () => setMode(mode === "signIn" ? "signUp" : "signIn"),
    [mode]
  );

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email: mail,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [mail, router, password]);

  const register = useCallback(async () => {
    try {
      await axios.post(`/api/register`, {
        email: mail,
        name: userName,
        password,
      });
      login();
    } catch (error) {
      console.error(error);
    }
  }, [mail, userName, login, password]);

  return (
    <div className="relative h-full w-full bg-center bg-fixed bg-cover bg-no-repeat bg-[url('/images/hero.jpg')]">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Logo />
        </nav>
        <div className="flex justify-center items-center">
          <div className="bg-black p-16 self-center mt-6 bg-opacity-70 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-3xl mb-8 font-semibold">
              {mode === "signIn" ? "Sign in" : "Sign up"}
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                id="email"
                label="Email"
                value={mail}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setMail(event.currentTarget.value)
                }
                type="email"
              />
              {mode === "signUp" && (
                <Input
                  id="username"
                  label="Username"
                  value={userName}
                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                    setUserName(event.currentTarget.value)
                  }
                />
              )}
              <Input
                id="password"
                label="Password"
                value={password}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setPassword(event.currentTarget.value)
                }
                type="password"
              />
            </div>
            <button
              onClick={mode === "signIn" ? login : register}
              className="bg-red-600 hover:bg-red-700 transition text-white w-full mt-4 py-2 rounded-md focus:outline-none"
            >
              {mode === "signIn" ? "Login" : "Register"}
            </button>

            <div className="flex justify-center gap-x-3 my-5">
              <span className="bg-white p-2 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center">
                <GoogleIcon />
              </span>
              <span
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="bg-white p-2 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center"
              >
                <GithubIcon />
              </span>
            </div>

            <p className="text-neutral-400 text-sm mt-10">
              {mode === "signIn"
                ? "Do not have an account?"
                : "Already have an account?"}
              <span
                onClick={toggleMode}
                className="hover:underline cursor-pointer ml-1 text-white"
              >
                {mode === "signIn" ? "Create an Account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
