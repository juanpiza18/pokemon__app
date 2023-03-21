import React, { useContext } from "react";
import Spinner from "../components/spinner/spinner.component";
import PokemonContext from "../context/pokemonContext";

// utilizar este HighOrder Component.
const WithSpinner = (WrappedComponent) => {
  const { loading } = useContext(PokemonContext);
  return ({ ...otherProps }) => {
    return loading ? <Spinner /> : <WrappedComponent {...otherProps} />;
  };
};

export default WithSpinner;
