import Logo from "../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchInput } from "../Inputs/SearchInput";

const logoStyles = {
  filter:
    "invert(96%) sepia(0%) saturate(15%) hue-rotate(256deg) brightness(104%) contrast(103%)",
};

const Header = () => {
  const random = Math.floor(Math.random() * 2811);

  const [scrollVisible, setScrollVisible] = useState(false);

  const focusSearch = () => {
    setScrollVisible(true);
    const searchInput = document.getElementById("search-input");
    window.setTimeout(() => searchInput.focus(), 0);
  };

  return (
    <nav id="header">
      <div
        className={`border-gray-200 px-2 sm:px-4 py-2.5 bg-gray-900 sticky top-0 z-[100] transition-all`}
      >
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="navbar flex gap-2">
            <Link href="/">
              <a className="flex items-center">
                <Image
                  src={Logo}
                  alt="logo"
                  width={"65px"}
                  height={"65px"}
                  layout="intrinsic"
                  style={logoStyles}
                />
              </a>
            </Link>
          </div>
          <div
            className="to-hidden justify-between items-center to-w-full md:flex md:w-auto md:order-2"
            id="mobile-menu-3"
          >
            <ul className="flex flex-row mt-4 to-md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link href="/">
                  <a
                    className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <button
                  onClick={focusSearch}
                  className="block py-2 pr-4 pl-3 md:border-0  md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                >
                  Search
                </button>
              </li>
            </ul>
          </div>
          {/* <div className="flex md:order-1">
          <button
            data-collapse-toggle="mobile-menu-3"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-3"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div> */}
        </div>
      </div>
      <div
        className={`
        ${scrollVisible ? `block` : "hidden"}
        w-full border-b border-gray-400 bg-gray-900 border-opacity-10 py-5 px-7`}
        onBlur={() => setScrollVisible(false)}
      >
        <SearchInput />
      </div>
    </nav>
  );
};

export default Header;
