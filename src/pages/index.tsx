import Image from "next/image";
import { Inter } from "next/font/google";
import { useContext, useEffect } from "react";
import { AuthContext, AuthProps } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { handleLogout, account } = useContext(AuthContext) as AuthProps;
  const router = useRouter();
  // useEffect(() => {
  //   if (!account) {
  //     router.push("/login");
  //   } else {
  //     router.push("/");
  //   }
  // }, [account, router]);

  // if (!account) return JSON.stringify(account);
  return (
    <main className={`min-h-full p-24 ${inter.className}`}>
      <aside className="rounded-lg shadow-md bg-gray-100 p-4 absolute top-0 right-0">
        <p className="text-blue-500 font-bold">User : {account?.username} </p>
        <button
          className="font-bold text-red-500"
          onClick={() => {
            handleLogout?.();
          }}
        >
          Logout
        </button>
      </aside>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
}
