import { useState } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

export const SearchInput = ({ show, onBlur }) => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.length > 0) router.push(`/search/${searchInput}`);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <div
        className={`
            ${show ? `block` : "hidden"}
            w-full px-2`}
        onBlur={onBlur}
      >
        <form className="flex items-center" onSubmit={handleSearch}>
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                  color="white"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search-input"
              className="border text-white text-sm rounded-lg block w-full pl-10 p-2.5 bg-primary border-gray-600 placeholder-gray-300 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Search"
              enterKeyHint="search"
              onChange={handleSearchChange}
              required
            />
          </div>

          {/* <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white rounded-lg border border-primary focus:ring-4 focus:outline-none bg-gray-600 hover:bg-primary focus:ring-gray-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button> */}
        </form>
      </div>
    </>
  );
};
