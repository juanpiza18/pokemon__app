import React, { useState } from "react";
import Header from "../components/header/header.component";
// import PokemonContainer from "../components/pokemon-container/pokemon.container";
import PokemonContainer2 from "../components/pokemon-container/pokemon2.container";

const HomePage = () => {
  const [search, setSearch] = useState(null);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <Header handleSearch={handleSearch} />
      <main className="homepage__container">
        {/* <PokemonContainer filter={search} /> */}
        <PokemonContainer2 filter={search} />
      </main>
    </>
  );
};

export default HomePage;
