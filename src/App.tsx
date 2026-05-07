import {Routes,Route } from "react-router-dom"

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
// import MovieDetails from "./pages/MovieDetails";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage/>}  />
           <Route  path="/movie/:id" element={<MovieDetails />} />
      </Routes>
   
    </MainLayout>
  );
}

export default App;