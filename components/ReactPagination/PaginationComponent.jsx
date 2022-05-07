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

  // const handlePageClickOld = (event) => {
  //   let desiredPage = event.target.textContent;
  //   if (activePage == desiredPage.replace("(current)", "")) return;
  //   window.scrollTo(0, 0);
  //   setSearchParams(`page=${desiredPage}`);
  // };
  // const handleFirstPageClick = (event) => {
  //   let desiredPage = 1;
  //   if (activePage == desiredPage) return;
  //   window.scrollTo(0, 0);
  //   setSearchParams(`page=${desiredPage}`);
  // };
  // const handleLastPageClick = (event) => {
  //   let desiredPage = pageCount;
  //   if (activePage == desiredPage) return;
  //   window.scrollTo(0, 0);
  //   setSearchParams(`page=${desiredPage}`);
  // };
  // const handlePrevPageClick = (event) => {
  //   let desiredPage = Number(activePage) - 1;
  //   setSearchParams(`page=${desiredPage}`);
  //   window.scrollTo(0, 0);
  // };
  // const handleNextPageClick = (event) => {
  //   let desiredPage = Number(activePage) + 1;
  //   setSearchParams(`page=${desiredPage}`);
  //   window.scrollTo(0, 0);
  // };

  // const paginationControls = {
  //   handlePageClickOld,
  //   handleFirstPageClick,
  //   handleLastPageClick,
  //   handlePrevPageClick,
  //   handleNextPageClick,
  // };
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
