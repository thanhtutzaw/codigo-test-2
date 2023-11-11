import { AuthContext, AuthProps } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { account, setaccount } = useContext(AuthContext) as AuthProps;
  const router = useRouter();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginLoading(true);
    const name = new FormData(e.currentTarget).get("username");
    const password = new FormData(e.currentTarget).get("password");
    setTimeout(() => {
      localStorage.setItem(
        "auth",
        JSON.stringify({ username: name, password } as AuthProps["account"])
      );

      setLoginLoading(false);
      setLoginSuccess(true);
      setaccount?.({ username: name, password });
      router.push("/");

      if (!localStorage.getItem("auth")) return;
      console.log(JSON.parse(localStorage.getItem("auth") ?? ""));
      router.push("/");
    }, 1000);
  }
  if (account) return;
  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="shadow-md min-w-[300px] flex gap-4 flex-1 h-96 flex-col justify-center items-start bg-gray-200 p-4 rounded-md"
      >
        <h1 className="font-bold mb-2 text-blue-500 text-2xl">Login</h1>
        <input
          placeholder="Username"
          className="p-[5px_10px] rounded-lg"
          required
          name="username"
        />
        <div>
          <input
            placeholder="Password"
            minLength={6}
            className="p-[5px_10px] rounded-lg"
            required
            type={showPassword ? "text" : "password"}
            name="password"
          />
          <button
            className="ml-2"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {!loginSuccess && (
          <button
            disabled={loginLoading}
            className="rounded-full flex justify-center px-4 bg-blue-500 text-white p-2"
            type="submit"
          >
            {loginLoading ? "Loading..." : "Login"}
          </button>
        )}
      </form>
    </div>
  );
}

export default Login;
