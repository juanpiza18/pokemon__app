import React from "react";
import PokemonCard from "../card/pokemonCard.component";

const PokemonList = ({ list }) => {
  // const { pokemonsList } = useContext(PokemonContext);
  return (
    <>
      {list.map((pokemon) => {
        const image =
          pokemon.sprites.other.dream_world.front_default ??
          pokemon.sprites.front_default;
        return (
          <PokemonCard
            key={pokemon.id}
            imageUrl={image}
            pokemonName={pokemon.name}
            pokemonNumber={pokemon.id}
            pokemonType={pokemon.types}
          />
        );
      })}
    </>
  );
};

export default React.memo(PokemonList);
