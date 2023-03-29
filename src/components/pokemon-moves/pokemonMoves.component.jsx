import React from "react";
import styles from "./pokemonMoves.module.css";

const PokemonMoves = ({ moves }) => {
  const principalMovesList1 = moves.slice(0, 15);
  const principalMovesList2 = moves.slice(15, 30);
  return (
    <div className={styles.pokemon__moves}>
      <h2>Principal Moves</h2>
      <div className={styles.listgrid__container}>
        <ul>
          {principalMovesList1.map((move, index) => (
            <li key={index}>{move.move.name}</li>
          ))}
        </ul>
        <ul>
          {principalMovesList2.map((move, index) => (
            <li key={index}>{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonMoves;
