import React, { useContext, useEffect } from "react";
import PokemonContext from "../../context/pokemonContext";
import PokemonList from "../card-list/cardList.component";
import "./pokemon.container.css";
import useResultsPaginated from "../../hooks/useResultsPagination.hooks";
import Pagination from "../pagination/pagination.component";

const PokemonContainer = ({ filter = null }) => {
  const {
    loading,
    dataList,
    filteredList,
    paginationNext,
    paginationPrev,
    filterAllList,
    fetchData,
  } = useContext(PokemonContext);

  const { filteredArray, pageOffsetNext, setPageOffset, pageOffsetPrev } =
    useResultsPaginated({ initialItems: filteredList });

  useEffect(() => {
    if (filter) {
      setPageOffset(0);
      filterAllList(filter);
    } else {
      fetchData();
    }
  }, [fetchData, filterAllList, setPageOffset, filter]);

  return (
    <div className="flex__container">
      <Pagination
        paginationNext={filter ? pageOffsetNext : paginationNext}
        paginationPrev={filter ? pageOffsetPrev : paginationPrev}
      />
      <div className="card__grid">
        <PokemonList
          loading={loading}
          list={filter ? filteredArray : dataList}
        />
      </div>
    </div>
  );
};

export default PokemonContainer;
