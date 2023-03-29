import React, { useState, useCallback, useRef } from "react";
import PokemonContext from "./pokemonContext";
import {
  getAllPokemons,
  getPokemonListByOffset,
  getPokemonById,
} from "../utils/pokemonApi";
import { defaultPokemonsSize } from "../utils/constants";
import Fuse from "fuse.js";

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: false,
  // includeMatches: false,
  findAllMatches: true,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["name"],
};

export const PokemonProvider = ({ children }) => {
  let fuseRef = useRef(null);
  const [pokemonsList, setPokemonList] = useState([]);
  const [allPokemonsFilter, setAllPokemonsFilter] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonLoading, setpokemonLoading] = useState(true);
  const [allPokemons, setAllPokemons] = useState([]);

  const fetchPokemonsOffset = useCallback(async () => {
    setLoading(true);
    const data = await getPokemonListByOffset(offset);
    setPokemonList(data);
    setLoading(false);
  }, [offset, setPokemonList, setLoading]);

  const fetchPokemonData = useCallback(
    async (id) => {
      setpokemonLoading(true);
      const data = await getPokemonById(id);
      setPokemon(data);
      setpokemonLoading(false);
    },
    [setPokemon, setpokemonLoading]
  );

  const filterAllPokemonsList = useCallback(
    async (filter) => {
      setLoading(true);
      const data =
        allPokemons.length > 0 ? allPokemons : await getAllPokemons();
      if (allPokemons.length === 0) {
        setAllPokemons(data);
        fuseRef.current = new Fuse(data, options);
      }
      const filterData = fuseRef.current
        ?.search(filter)
        .map((data) => data.item);
      setAllPokemonsFilter(filterData);
      setLoading(false);
    },
    [allPokemons, setAllPokemonsFilter, setLoading]
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
        fetchPokemonData,
        pokemon,
        pokemonLoading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
