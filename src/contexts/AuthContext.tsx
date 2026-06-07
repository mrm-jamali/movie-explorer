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
  loading: boolean;

  login: (username: string, password: string) => boolean;
  logout: () => void;

  register: (
    username: string,
    email: string,
    password: string
  ) => boolean;

  syncCurrentUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD USER ON REFRESH
  ========================= */
  useEffect(() => {
    const stored = localStorage.getItem("currentUser");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        const safeUser: User = {
          ...parsed,
          favorites: parsed.favorites || [],
          watchlist: parsed.watchlist || [],
          activities: parsed.activities || [],
          notifications: parsed.notifications || [],
        };

        setUser(safeUser);
      } catch {
        localStorage.removeItem("currentUser");
      }
    }

    setLoading(false);
  }, []);

  /* =========================
     SYNC USER (MAIN FIX)
  ========================= */
  const syncCurrentUser = (updatedUser: User) => {
    const safeUser: User = {
      ...updatedUser,
      favorites: updatedUser.favorites || [],
      watchlist: updatedUser.watchlist || [],
      activities: updatedUser.activities || [],
      notifications: updatedUser.notifications || [],
    };

    setUser(safeUser);

    localStorage.setItem("currentUser", JSON.stringify(safeUser));

    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const updatedUsers = users.map((u) =>
      u.id === safeUser.id ? safeUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  /* =========================
     REGISTER
  ========================= */
  const register = (
    username: string,
    email: string,
    password: string
  ) => {
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
      watched: [],
      activities: [],
      notifications: [],
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setUser(newUser);

    return true;
  };

  /* =========================
     LOGIN
  ========================= */
  const login = (username: string, password: string) => {
    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const foundUser = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (!foundUser) return false;

    const safeUser: User = {
      ...foundUser,
      favorites: foundUser.favorites || [],
      watchlist: foundUser.watchlist || [],
      activities: foundUser.activities || [],
      notifications: foundUser.notifications || [],
    };

    setUser(safeUser);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(safeUser)
    );

    return true;
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        register,
        syncCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =========================
   HOOK
========================= */
export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside provider");
  }

  return ctx;
}