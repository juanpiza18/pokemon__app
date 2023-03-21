import { pokemonAPI } from "./constants";

export const getPokemonById = async (id) => {
  const pokemonData = await (await fetch(`${pokemonAPI}pokemon/${id}`)).json();
  return pokemonData;
};

export const getPokemonListByOffset = async (offset) => {
  const request = await fetch(
    `${pokemonAPI}pokemon?limit=${21}&offset=${offset}`
  );
  const data = (await request.json()).results;
  const pokemonPromises = data.map(async (pokemon) => {
    const pokemonData = await (await fetch(`${pokemon.url}`)).json();
    return pokemonData;
  });
  return await Promise.all([...pokemonPromises]);
};

export const getAllPokemons = async () => {
  const request = await fetch(`${pokemonAPI}pokemon?limit=100000&offset=0`);
  const data = (await request.json()).results;
  const pokemonPromises = data.map(async (pokemon) => {
    const pokemonData = await (await fetch(`${pokemon.url}`)).json();
    return pokemonData;
  });
  return await Promise.all([...pokemonPromises]);
};
