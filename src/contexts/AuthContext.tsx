import { createContext, useContext, useState, ReactNode } from "react";

// User Type
type User = {
  username: string;
  email: string;
  avatar: string;
};

// Context Type
type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

// Create Context
const AuthContext = createContext<AuthContextType | null>(null);

// Fake Database (کاربران واقعی شبیه‌سازی شده)
const fakeUsers: Record<string, User> = {
  maryam: {
    username: "maryam",
    email: "maryam@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
  },
  ali: {
    username: "ali",
    email: "ali@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  reza: {
    username: "reza",
    email: "reza@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
};

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Load user from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login
  const login = (username: string, password: string) => {
    if (!username || !password) return false;

    const foundUser = fakeUsers[username];

    if (!foundUser) return false;

    setUser(foundUser);

    localStorage.setItem("user", JSON.stringify(foundUser));

    return true;
  };

  // Logout
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

// Hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}