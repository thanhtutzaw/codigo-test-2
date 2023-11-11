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
};
export const AuthContext = createContext<AuthProps | null>(null);
export function AuthProvider(props: AuthProps) {
  const { children } = props;
  const [account, setaccount] = useState<AuthProps["account"] | null>(null);
  const router = useRouter();
  const handleLogout = useCallback(() => {
    localStorage.removeItem("auth");
    setaccount(null);
    router.push("/login");
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
        account: account,
        setaccount: setaccount,
        handleLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
