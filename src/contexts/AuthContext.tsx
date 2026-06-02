import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { ReactNode } from "react";
import type { User } from "../types/user";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;

  login: (username: string, password: string) => boolean;
  logout: () => void;

  register: (
    username: string,
    email: string,
    password: string
  ) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  /* LOAD USER */
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* REGISTER */
  const register = (username: string, email: string, password: string) => {
    if (!username || !email || !password) return false;

    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const exists = users.some((u) => u.username === username);

    if (exists) return false;

    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      email,
      password,
      avatar: `https://i.pravatar.cc/300?u=${username}`,
      location: "Tehran",
      joined: new Date().toISOString(),
      favorites: [],
      watchlist: [],
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setUser(newUser);

    return true;
  };

  /* LOGIN */
  const login = (username: string, password: string) => {
    if (!username || !password) return false;

    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const foundUser = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (!foundUser) return false;

    setUser(foundUser);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    return true;
  };

  /* LOGOUT */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register, // ✅ حالا واقعی شد
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}