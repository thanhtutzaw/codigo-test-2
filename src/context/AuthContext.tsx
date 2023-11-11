import useLocalStorage from "@/hooks/useLocalStorage";
import usePlayer from "@/hooks/usePlayer";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

export type AuthProps = {
  setaccount?: Function;
  handleLogout?: Function;
  account?: {
    username: string;
    password: string | number;
  } | null;
  children: ReactNode;
} & ReturnType<typeof usePlayer>;
export const AuthContext = createContext<AuthProps | null>(null);
export function AuthProvider(props: AuthProps) {
  const { children } = props;
  const [account, setaccount] = useState<AuthProps["account"] | null>(null);
  const router = useRouter();
  const { deleteLocal } = useLocalStorage("auth");
  const { playerError, players, playerLoading, playerMeta } = usePlayer();
  const handleLogout = useCallback(() => {
    localStorage.removeItem("auth");
    setaccount(null);
    router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setaccount(JSON.parse(localStorage.getItem("auth") ?? ""));
      router.push("/");
    } else {
      setaccount(null);
      router.push("/login");
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        ...props,
        playerError: playerError,
        playerMeta: playerMeta,
        playerLoading: playerLoading,
        players: players,
        account: account,
        setaccount: setaccount,
        handleLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
