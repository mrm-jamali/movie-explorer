import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Clapperboard, ArrowLeft } from "lucide-react";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      setError("");
      navigate("/");
    } else {
      setError("Username and password are required");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
        
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <div className="bg-purple-100 p-3 rounded-2xl">
            <Clapperboard
              size={36}
              className="text-purple-600"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 text-sm mt-1 mb-5">
          Sign in to continue exploring movies
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-500 text-sm">
                {error}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 active:scale-[0.98] transition"
          >
            Login
          </button>

          {/* Back Link */}
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 hover:underline transition cursor-pointer text-sm"
            >
              <ArrowLeft size={15} />
              Back to Home
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Movie Explorer © 2026
        </p>
      </div>
    </div>
  );
}