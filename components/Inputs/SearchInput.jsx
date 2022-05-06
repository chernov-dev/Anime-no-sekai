import { useState } from "react";
import Link from "next/link";
import Router from "next/router";

export const SearchInput = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    Router.push(`/search/${searchInput}`);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <form
        className="flex items-center gap-2 relative"
        onSubmit={handleSearch}
      >
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          className="block p-2 pl-10 w-full rounded-lg border sm:text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
        <button
          className="p-1.5 bg-gray-700 border-gray-600 border text-white rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
    </>
  );
};
