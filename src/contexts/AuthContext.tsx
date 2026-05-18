import { createContext, useContext, useState, ReactNode } from "react";

// 1. نوع کاربر
type User = {
  username: string;
};

// 2. تایپ کل context
type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

// 3. ساخت context
const AuthContext = createContext<AuthContextType | null>(null);

// 4. Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  // 🔹 persistent state با localStorage
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 🔹 fake login
  const login = (username: string, password: string) => {
    if (username && password) {
      const newUser = { username };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  // 🔹 logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. custom hook برای استفاده راحت‌تر
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}