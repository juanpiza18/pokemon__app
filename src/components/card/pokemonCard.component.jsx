import React from "react";
import { Link } from "react-router-dom";
import PokemonType from "../pokemon-type/pokemonType.component";
import "./card.styles.css";

const PokemonCard = ({
  imageUrl,
  pokemonName,
  pokemonNumber,
  pokemonType = [],
}) => {
  return (
    <Link className="card__link" to={`/pokemon/${pokemonNumber}`}>
      <div className="card-container">
        <div className="pokemon__info">
          <span className="pokemon__number">#{pokemonNumber}</span>
          <h2 className="pokemon__name">{pokemonName}</h2>
        </div>
        <img
          className="pokemon__image"
          src={imageUrl}
          alt={`Pokemon ${pokemonName}`}
        />
        <div className="pokemon__types">
          {pokemonType.map(({ type }, index) => (
            <PokemonType key={index} nameType={type.name} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
