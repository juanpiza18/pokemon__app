import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PokemonPage from "./pages/pokemon.page";
import HomePage from "./pages/home.page";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="pokemon/:id" element={<PokemonPage />} />
      </Routes>
    </div>
  );
};

export default App;
