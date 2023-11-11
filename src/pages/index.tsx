import PlayerList from "@/Components/PlayerList";
import { AuthContext, AuthProps } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    playerError,
    playerLoading,
    handleLogout,
    account,
    players,
    playerMeta,
  } = useContext(AuthContext) as AuthProps;
  const router = useRouter();
  useEffect(() => {
    if (!account) {
      router.push("/login");
    }
  }, [account, router]);

  if (!account) return;
  return (
    <main
      className={`max-w-[1129px] min-w-[95vw] min-h-full p-[2rem] pb-0 ${inter.className}`}
    >
      <header className="items-center flex-wrap overflow-hidden sticky top-0 mb-[1rem] flex justify-between rounded-lg shadow-md bg-gray-100 p-4 ">
        <p className="text-blue-500 font-bold">User - {account?.username} </p>
        <button
          className="hover:bg-gray-200 active:bg-gray-200 p-2 rounded-md active:opacity-50 transition-[opacity] duration-75 ease font-bold text-red-500"
          onClick={() => {
            handleLogout?.();
          }}
        >
          Logout
        </button>
      </header>
      {playerLoading ? (
        <p className="text-center bg-zinc-300 mt-2 p-2">Loading...</p>
      ) : playerError ? (
        <p>{playerError}</p>
      ) : (
        <>
          <ul className="bg-white">
            {players.map((player) => (
              <PlayerList key={player.id} player={player} />
            ))}
            {playerMeta?.next_page && (
              <p className="text-center bg-zinc-300 mt-2 p-2">Loading...</p>
            )}
          </ul>
        </>
      )}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
}
