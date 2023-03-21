import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner/spinner.component";
import PokemonType from "../components/pokemon-type/pokemonType.component";
import { getPokemonById } from "../utils/pokemonApi";
import "./pokemon-page.styles.css";
import Header from "../components/header/header.component";

const PokemonPage = () => {
  let image = null;
  const [pokemon, setPokemon] = useState(null);
  const [pokemonLoading, setpokemonLoading] = useState(true);
  const { id } = useParams();
  console.log(id);

  const fetchPokemonData = useCallback(async () => {
    const data = await getPokemonById(id);
    setPokemon(data);
    setpokemonLoading(false);
  }, [id]);

  // const retrievePokemon = useCallback(async () => {
  //   console.log("Entro al metodo retrieve");
  //   setpokemonLoading(true);
  //   const pokemonFromList = pokemonsList.find((pokemon) => pokemon.id === id);
  //   if (!pokemonFromList) {
  //     const data = await getPokemonById(id);
  //     setPokemon(data);
  //     setpokemonLoading(false);
  //   } else {
  //     setPokemon(pokemonFromList);
  //     setpokemonLoading(false);
  //   }
  // }, [id, pokemonsList]);

  useEffect(() => {
    console.log("Entro al metodo useEffect");
    console.log("UseEffect retrieve pokemon");
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
            <div className="pokemon__heading">
              <span className="heading__number"> #{pokemon.id}</span>
              <img
                className="heading__image"
                src={image}
                alt={`Pokemon - ${pokemon.name}`}
              />
              <div className="pokemonheading__information">
                <h1 className="pokemonheading__name"> {pokemon.name}</h1>
                <div className="pokemonheading__types">
                  {pokemon.types.map(({ type }, index) => (
                    <PokemonType key={index} nameType={type.name} />
                  ))}
                </div>
              </div>
              <div className="pokemon__basic">
                <div className="group__info">
                  <h3> Height </h3>
                  <span> {pokemon.height}</span>
                </div>
                <div className="group__info">
                  <h3> Weight </h3>
                  <span> {pokemon.weight}</span>
                </div>
                <div className="group__info">
                  <h3> Base Experience </h3>
                  <span> {pokemon.base_experience}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="pokemon__stats">
                <h2>Stats</h2>
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="stat__group">
                    <span>{stat.stat.name}</span>
                    <progress value={stat.base_stat} max={230} />
                    <span>{stat.base_stat}</span>
                  </div>
                ))}
              </div>
              <div className="pokemon__moves">
                <h2>Principal Moves</h2>
                <div className="listgrid__container">
                  <ul>
                    {pokemon.moves.slice(0, 15).map((move, index) => (
                      <li key={index}>{move.move.name}</li>
                    ))}
                  </ul>
                  <ul>
                    {pokemon.moves.slice(15, 30).map((move, index) => (
                      <li key={index}>{move.move.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PokemonPage;
