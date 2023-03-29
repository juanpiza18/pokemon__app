import React from "react";
import styles from "./pagination.module.css";

const Pagination = ({ paginationNext, paginationPrev }) => {
  return (
    <div className={styles.list__actions}>
      <button className="btn" onClick={paginationPrev}>
        &larr; Prev
      </button>
      <button className="btn" onClick={paginationNext}>
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
