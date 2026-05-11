import { Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import Favorite from "./pages/Favorite";
import MoviesList from "./pages/MoviesList";

import { FavoriteProvider } from "./contexts/Favoritecontext";

function App() {
  return (
    <HashRouter>
      <FavoriteProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/movies" element={<MoviesList />} />
          </Routes>
        </MainLayout>
      </FavoriteProvider>
    </HashRouter>
  );
}

export default App;