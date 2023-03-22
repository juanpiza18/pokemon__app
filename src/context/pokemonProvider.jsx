import React, { useState, useCallback } from "react";
import PokemonContext from "./pokemonContext";
import { getAllPokemons, getPokemonListByOffset } from "../utils/pokemonApi";
import { defaultPokemonsSize } from "../utils/constants";

export const PokemonProvider = ({ children }) => {
  const [pokemonsList, setPokemonList] = useState([]);
  const [allPokemonsFilter, setAllPokemonsFilter] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchPokemonsOffset = useCallback(async () => {
    setLoading(true);
    const data = await getPokemonListByOffset(offset);
    setPokemonList(data);
    setLoading(false);
  }, [offset, setPokemonList, setLoading]);

  const filterAllPokemonsList = useCallback(
    async (filter) => {
      setLoading(true);
      const data = await getAllPokemons();
      // TODO: Mejorar Filtro
      const filterData = data.filter((pokemon) =>
        pokemon.name.includes(filter)
      );
      setAllPokemonsFilter(filterData);
      setLoading(false);
    },
    [setAllPokemonsFilter, setLoading]
  );

  const paginationNext = () => {
    setOffset((prev) => {
      if (prev === defaultPokemonsSize) {
        return 1261;
      }
      return prev + 21;
    });
  };

  const paginationPrev = () => {
    setOffset((prev) => {
      if (prev > 0) {
        return prev - 21;
      }
      return 0;
    });
  };

  return (
    <PokemonContext.Provider
      value={{
        dataList: pokemonsList,
        filteredList: allPokemonsFilter,
        offset,
        loading,
        paginationNext,
        paginationPrev,
        filterAllList: filterAllPokemonsList,
        fetchData: fetchPokemonsOffset,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
