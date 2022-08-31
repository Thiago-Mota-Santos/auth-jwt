import { createContext, useEffect, useState } from "react";
import { recoverUserInfo, SignInRequest } from "../services/auth";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/api";

export interface signInData {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  avatar_url: string;
}

interface IAuth {
  isAuth: boolean;
  user: User;
  signIn: (data: signInData) => Promise<void>;
}

export const AuthContext = createContext({} as IAuth);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuth = !!user;

  useEffect(() => {
    const { token: token } = parseCookies();
    if (token) {
      recoverUserInfo().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ email, password }: signInData) {
    const { token, user } = await SignInRequest({
      email,
      password,
    });
    setCookie(undefined, "token", token, {
      maxAge: 60 * 60 * 24, // 24 horas
    });

    api.defaults.headers["authorization"] = `bearer ${token}`;
    setUser(user);
    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
