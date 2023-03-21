import React from "react";

const useResultsPaginated = ({ initialItems }) => {
  const defaultPageSize = 21; // dejar por fuera porque es un const no se va a redeclarar.
  const [items, setItems] = React.useState(initialItems);
  const [filteredArray, setfilteredArray] = React.useState([]);
  const [pageOffset, setPageOffset] = React.useState(0);

  const paginateArray = React.useCallback(() => {
    const limitPage = defaultPageSize + pageOffset;
    setfilteredArray(items.slice(pageOffset, limitPage));
  }, [setfilteredArray, items, pageOffset]);

  React.useEffect(() => {
    paginateArray();
  }, [paginateArray]);

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const pageOffsetNext = () => {
    setPageOffset((prev) => {
      const totalPages = Math.floor(items.length / defaultPageSize);
      const maxOffset = totalPages * defaultPageSize;
      if (prev < maxOffset) {
        return prev + defaultPageSize;
      }
      return prev;
    });
  };
  const pageOffsetPrev = () => {
    setPageOffset((prev) => {
      if (prev !== 0) {
        return prev - defaultPageSize;
      }
      return prev;
    });
  };

  return {
    filteredArray,
    pageOffsetNext,
    pageOffsetPrev,
    setPageOffset,
  };
};

export default useResultsPaginated;
