import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

const PaginationComponent = ({ pageCount, currentPage }) => {
  const router = useRouter();

  const handlePageClick = (event) => {
    let desiredPage = event.selected;
    router.push(`?page=${++desiredPage}`);
  };

  if (currentPage > pageCount) return;
  return (
    <>
      <ReactPaginate
        forcePage={(currentPage ?? 1) - 1}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        nex
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="pagination"
        pageLinkClassName="page-link"
        pageClassName="page-item"
        breakClassName="page-item"
        breakLinkClassName="page-link"
      />
    </>
  );
};

export default PaginationComponent;
