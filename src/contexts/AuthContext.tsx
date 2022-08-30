import { createContext, useState } from "react";
import { SignInRequest } from "../services/auth";
import { setCookie } from "nookies";
import Router from "next/router";

interface signInData {
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

  async function signIn({ email, password }: signInData) {
    const { token, user } = await SignInRequest({
      email,
      password,
    });
    setCookie(undefined, "token", token, {
      maxAge: 60 * 60 * 24, // 24 horas
    });

    setUser(user);
    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
