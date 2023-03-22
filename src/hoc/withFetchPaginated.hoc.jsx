import React, { useContext, useEffect } from "react";
import useResultsPaginated from "../hooks/useResultsPagination.hooks";
import Pagination from "../components/pagination/pagination.component";

const WithFetch = (WrappedComponent, contextProvider) =>
  function Fetch({ filter, ...otherProps }) {
    const {
      loading,
      dataList,
      filteredList,
      filterAllList,
      fetchData,
      paginationNext,
      paginationPrev,
    } = useContext(contextProvider);

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

    const data = filter ? filteredArray : dataList;
    const prev = filter ? pageOffsetPrev : paginationPrev;
    const next = filter ? pageOffsetNext : paginationNext;

    return (
      <div className="flex__container">
        <Pagination paginationNext={next} paginationPrev={prev} />
        <div className="card__grid">
          <WrappedComponent list={data} loading={loading} {...otherProps} />
        </div>
      </div>
    );
  };

export default WithFetch;
