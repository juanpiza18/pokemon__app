import React from "react";
import styles from "./searchBox.module.css";
import { debounce } from "../../utils/utils";

const SearchBox = ({ placeHolder, handleChange }) => {
  const handleSearch = debounce((event) => handleChange(event));
  return (
    <div className={styles.search__container}>
      <input
        className={styles.search}
        type="search"
        placeholder={placeHolder}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBox;
