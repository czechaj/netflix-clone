import { useState, useCallback } from "react";
import { Logo } from "@/components/icons";
import { Input } from "@/components/ui-elements";

export default function AuthPage() {
  const [mail, setMail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  const toggleMode = useCallback(
    () => setMode(mode === "signIn" ? "signUp" : "signIn"),
    [mode]
  );

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
            <button className="bg-red-600 hover:bg-red-700 transition text-white w-full mt-4 py-2 rounded-md focus:outline-none">
              {mode === "signIn" ? "Login" : "Register"}
            </button>
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
