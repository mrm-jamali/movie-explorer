import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();

  // ⛔ مهم: هنوز auth لود نشده
  if (loading) {
    return null; // یا spinner
  }

  // ⛔ بعد از لود، اگر user نبود
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}