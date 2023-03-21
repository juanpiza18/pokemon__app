import React from "react";
import { Link, useParams } from "react-router-dom";
import SearchBox from "../search-box/searchBox.component";
import logo from "../../assets/Pokedex_logo.png";
import "./header.styles.css";

const Header = ({ handleSearch }) => {
  const { id } = useParams();
  return (
    <header>
      <img className="pokedex__logo" src={logo} alt="Pokedex logo" />
      {/* No es buena practica revisar despues */}
      {id ? (
        <></>
      ) : (
        <SearchBox placeHolder="Search Pokemon" handleChange={handleSearch} />
      )}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
