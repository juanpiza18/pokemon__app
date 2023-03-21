import React from "react";
import "./searchBox.styles.css";

function debounce(func, timeout = 600) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const SearchBox = ({ placeHolder, handleChange }) => {
  const handleSearch = debounce((event) => handleChange(event));
  return (
    <div className="search__container">
      <input
        className="search"
        type="search"
        placeholder={placeHolder}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBox;
