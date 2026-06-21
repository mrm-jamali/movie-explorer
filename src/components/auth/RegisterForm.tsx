import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Clapperboard,
  ArrowLeft,
} from "lucide-react";

type Props = {
  onSubmit: (
    username: string,
    email: string,
    password: string
  ) => void;
};

export default function RegisterForm({
  onSubmit,
}: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-5 sm:p-6">
        
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <div className="bg-purple-100 p-3 rounded-2xl">
            <Clapperboard
              size={36}
              className="text-purple-600"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 text-sm mt-1 mb-5">
          Join Movie Explorer and start building your movie collection
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 active:scale-[0.98] transition mt-2"
          >
            Create Account
          </button>

          {/* Back Link */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 hover:underline cursor-pointer transition text-sm"
            >
              <ArrowLeft size={15} />
              Back to Home
            </Link>
          </div>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
            >
              Login
            </Link>
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