

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";


export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (
    username: string,
    email: string,
    password: string
  ) => {
    const success = register(username, email, password);

    if (success) {
      navigate("/");
    } else {
      alert("User already exists or invalid data");
    }
  };

  return <RegisterForm onSubmit={handleRegister} />;
}