import { Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import SiteLayout from "./components/layout/SiteLayout";

import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import Favorite from "./pages/Favorite";
import MoviesList from "./pages/MoviesList";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { FavoriteProvider } from "./contexts/FavoriteContext";
import { AuthProvider } from "./contexts/AuthContext";
import { WatchListProvider } from "./contexts/WatchListContext";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <FavoriteProvider>
          <WatchListProvider>
            <Routes>
              {/* PUBLIC */}
              <Route
                path="/"
                element={
                  <SiteLayout>
                    <HomePage />
                  </SiteLayout>
                }
              />

              <Route
                path="/movies"
                element={
                  <SiteLayout>
                    <MoviesList />
                  </SiteLayout>
                }
              />

              <Route
                path="/movie/:id"
                element={
                  <SiteLayout>
                    <MovieDetails />
                  </SiteLayout>
                }
              />

              {/* AUTH */}
              <Route path="/login" element={<LoginPage />} />

              <Route path="/register" element={<RegisterPage />} />

              {/* PROFILE */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* FAVORITE */}
              <Route
                path="/favorite"
                element={
                  <SiteLayout>
                    <Favorite />
                  </SiteLayout>
                }
              />
            </Routes>
          </WatchListProvider>
        </FavoriteProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
