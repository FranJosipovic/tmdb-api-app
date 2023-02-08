import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { createNewSessionApi } from "../api/session";
import { useLocalStorage } from "../hooks/useLocalStorage";

type SessionContext = {
  createNewSession: () => void;
};

type Session = {
  expires_at: string;
  guest_session_id: string;
  success: boolean;
};

const Context = createContext<SessionContext | null>(null);

export function useSession() {
  return useContext(Context) as SessionContext;
}

type SessionProviderProps = {
  children: ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useLocalStorage<Session>("session");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("activ");
    if (session === undefined || null) {
      return navigate("/");
    } else if (
      new Date(session?.expires_at!).getTime() < new Date().getTime()
    ) {
      localStorage.removeItem("session");
      setSession(undefined);
      return navigate("/");
    } else {
      navigate("/main");
      setSessionTimeout();
    }

    return () => clearTimeout(setSessionTimeout());
  }, [session]);

  function createNewSession() {
    createNewSessionApi().then((data: Session) => {
      if (data.success) {
        setSession(data);
      }
    });
  }

  function setSessionTimeout() {
    let date = new Date().getTime();
    let expireTime = new Date(session?.expires_at!).getTime() - date;
    return setTimeout(() => {
      localStorage.removeItem("session");
      setSession(undefined);
    }, expireTime);
  }

  return (
    <Context.Provider value={{ createNewSession }}>{children}</Context.Provider>
  );
}
