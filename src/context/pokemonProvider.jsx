import React, { useState } from "react";
import PokemonContext from "./pokemonContext";

// Funciones y crear modificadores ... 
// filtro podria aplicarse en el Context .. guardar todos los pokemons
// cachear la informacion de los pokemos. 
// Mejorar y pasar las funciones que se utlizan de m,anera individual en los componentes para que el context tengo como ese labor.

export const PokemonProvider = ({ children }) => {
  const [pokemonsList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  // const [loading, setLoading] = useState(true);

  // const fetchAllPokemons = useCallback(async () => {
  //   setPokemonList(results);
  //   setLoading(false);
  // }, [offset]);

  // useEffect(() => {
  //   fetchAllPokemons();
  // }, [fetchAllPokemons]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonsList,
        setPokemonList,
        offset,
        setOffset,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
