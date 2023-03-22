import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner/spinner.component";
import { getPokemonById } from "../utils/pokemonApi";
import Header from "../components/header/header.component";
import PokemonStats from "../components/pokemon-stats/pokemonStats.component";
import PokemonMoves from "../components/pokemon-moves/pokemonMoves.component";
import PokemonProfile from "../components/pokemon-profile/pokemonProfile.component";

const PokemonPage = () => {
  let image = null;
  const [pokemon, setPokemon] = useState(null);
  const [pokemonLoading, setpokemonLoading] = useState(true);
  const { id } = useParams();

  const fetchPokemonData = useCallback(async () => {
    const data = await getPokemonById(id);
    setPokemon(data);
    setpokemonLoading(false);
  }, [id]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  if (pokemon?.sprites) {
    image =
      pokemon.sprites.other.dream_world.front_default ??
      pokemon.sprites.front_default;
  }

  return (
    <>
      <Header />
      <div className="pokemonpage__container">
        {pokemonLoading ? (
          <Spinner />
        ) : (
          <>
            <PokemonProfile pokemon={pokemon} image={image} />
            <div>
              <PokemonStats stats={pokemon.stats} />
              <PokemonMoves moves={pokemon.moves} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PokemonPage;
