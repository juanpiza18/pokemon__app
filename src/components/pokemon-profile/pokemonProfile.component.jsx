import React from "react";
import PokemonType from "../pokemon-type/pokemonType.component";
import styles from "./pokemonProfile.module.css";

const PokemonProfile = ({ pokemon, image }) => {
  const { id, name, types, height, weight, base_experience } = pokemon;
  return (
    <div className={styles.pokemon__heading}>
      <span className={styles.heading__number}> #{id}</span>
      <img
        className={styles.heading__image}
        src={image}
        alt={`Pokemon - ${name}`}
      />
      <div className={styles.pokemonheading__information}>
        <h1 className={styles.pokemonheading__name}> {name}</h1>
        <div className={styles.pokemonheading__types}>
          {types.map(({ type }, index) => (
            <PokemonType key={index} nameType={type.name} />
          ))}
        </div>
      </div>
      <div className={styles.pokemon__basic}>
        <div className={styles.group__info}>
          <h3> Height </h3>
          <span> {height}</span>
        </div>
        <div className={styles.group__info}>
          <h3> Weight </h3>
          <span> {weight}</span>
        </div>
        <div className={styles.group__info}>
          <h3> Base Experience </h3>
          <span> {base_experience}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonProfile;
