import { Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import Favorite from "./pages/Favorite";
import MoviesList from "./pages/MoviesList";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { FavoriteProvider } from "./contexts/FavoriteContext";
import { AuthProvider } from "./contexts/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <FavoriteProvider>
          <MainLayout>
            <Routes>
              {/* عمومی */}
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesList />} />
              <Route path="/movie/:id" element={<MovieDetails />} />

              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* محافظت‌شده */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/favorite"
                element={
                  <ProtectedRoute>
                    <Favorite />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MainLayout>
        </FavoriteProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;