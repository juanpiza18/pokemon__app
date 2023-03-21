import React, { useContext, useState, useEffect, useCallback } from "react";
import PokemonContext from "../../context/pokemonContext";
import PokemonList from "../card-list/cardList.component";
import { getPokemonListByOffset, getAllPokemons } from "../../utils/pokemonApi";
import "./pokemon.container.css";
import Spinner from "../spinner/spinner.component";
import useResultsPaginated from "../../hooks/useResultsPagination.hooks";

const PokemonContainer = ({ filter = null }) => {
  const [loading, setLoading] = useState(true);
  const { offset, setOffset, pokemonsList, setPokemonList } =
    useContext(PokemonContext);

  const { filteredArray, pageOffsetNext, setPageOffset, pageOffsetPrev } =
    useResultsPaginated({ initialItems: pokemonsList });

  const paginationNext = () => {
    setOffset((prev) => {
      if (prev === 1281) {
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

  const fetchPokemonList = useCallback(async () => {
    const data = await getPokemonListByOffset(offset);
    setPokemonList(data);
    setLoading(false);
  }, [offset, setPokemonList, setLoading]);

  const fetchPokemonFilter = useCallback(async () => {
    setLoading(true);
    const data = await getAllPokemons();
    const filterData = data.filter((pokemon) => pokemon.name.includes(filter));
    setPokemonList(filterData);
    setLoading(false);
  }, [filter, setPokemonList, setLoading]);

  useEffect(() => {
    if (filter) {
      setPageOffset(0);
      fetchPokemonFilter();
    } else {
      fetchPokemonList();
    }
  }, [fetchPokemonList, fetchPokemonFilter, setPageOffset, filter]);

  return (
    <div className="flex__container">
      <div className="list__actions">
        <button
          className="btn"
          onClick={filter ? pageOffsetPrev : paginationPrev}
        >
          &larr; Prev
        </button>
        <button
          className="btn"
          onClick={filter ? pageOffsetNext : paginationNext}
        >
          Next &rarr;
        </button>
      </div>
      <div className="card__grid">
        {loading ? (
          <Spinner />
        ) : (
          <PokemonList list={filter ? filteredArray : pokemonsList} />
        )}
      </div>
    </div>
  );
};

export default PokemonContainer;
