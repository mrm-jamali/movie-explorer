import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { ReactNode } from "react";

type User = {
  username: string;
  avatar: string;
  location: string;
  joined: string;
};

type AuthContextType = {
  user: User | null;

  isAuthenticated: boolean;

  login: (
    username: string,
    password: string
  ) => boolean;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  /* LOAD USER */
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* LOGIN */
  const login = (
    username: string,
    password: string
  ) => {

    if (!username || !password) {
      return false;
    }

    const loggedUser: User = {
      username,
     avatar:
  `https://i.pravatar.cc/300?u=${username}`,

      location: "Tehran, Iran",

      joined: "May 2024",
    };

    setUser(loggedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(loggedUser)
    );

    return true;
  };

  /* LOGOUT */
  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        isAuthenticated: !!user,

        login,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}