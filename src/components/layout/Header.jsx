import Logo from "../../../public/favicon.ico";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SearchInput } from "../Inputs/SearchInput";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { FcSettings } from "react-icons/fc";
import { UserPreferencesContext } from "../../context/UserPreferencesProvider";
import { getRandomId } from "./../../api/getRandomAnime";
import { useQuery } from "@tanstack/react-query";

const logoStyles = {
  filter:
    "invert(96%) sepia(0%) saturate(15%) hue-rotate(256deg) brightness(104%) contrast(103%)",
};

const Header = () => {
  const router = useRouter();
  const userPreferences = useContext(UserPreferencesContext);
  const { colorMode } = userPreferences.prefs;
  const [searchVisible, setSearchVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [randomId, setRandomId] = useState();

  // const {
  //   data: randomId,
  //   isLoading,
  //   isSuccess,
  //   refetch,
  // } = useQuery(["random-anime-id"], () => getrandomId());

  const fetchRandomId = async () => {
    const id = await getRandomId();
    setRandomId(id);
  };

  useEffect(() => {
    fetchRandomId();
  }, [router.asPath]);

  //TODO link is still uncrawlable for Search Engines
  const handleSearchDropdown = () => {
    const input = document.getElementById("search-input");
    setSearchVisible((prevValue) => !prevValue);
    setTimeout(() => {
      input.focus();
    }, 0);
  };

  const handleMenuDropdownClose = () => {
    setShowMenu(false);
  };

  const handleMenuDropdown = () => {
    const sticky = document.getElementById("navbar-sticky");
    setShowMenu((prevValue) => !prevValue);
  };

  return (
    <nav className={styles.header}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a
            className="flex items-center"
            onClick={() => handleMenuDropdownClose()}
          >
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
        <div className="flex md:order-2 items-center gap-3">
          <button
            type="button"
            onClick={handleSearchDropdown}
            className={`${!searchVisible ? `block` : "hidden"} ${
              styles.primaryBtn
            } `}
          >
            Search
          </button>
          <SearchInput
            show={searchVisible}
            onBlur={() => setSearchVisible(false)}
          />
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className={`${styles.menuBtn}`}
            onClick={handleMenuDropdown}
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
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
          </button>
          <div className="hidden md:block">
            <FcSettings size={30} />
          </div>
        </div>
        <div
          className={`${
            showMenu ? "block" : "hidden"
          } justify-between items-center w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
          onBlur={() => setShowMenu(false)}
        >
          <ul className={styles.navList}>
            <li>
              <Link href="/">
                <a
                  className={`${styles.navOption} ${
                    router.pathname == "/" ? styles.active : ""
                  }`}
                  aria-current="page"
                  onClick={() => handleMenuDropdownClose()}
                >
                  Airing
                </a>
              </Link>
            </li>
            <li>
              <Link href="/upcoming">
                <a
                  className={`${styles.navOption} ${
                    router.pathname == "/upcoming" ? styles.active : ""
                  }`}
                  aria-current="page"
                  onClick={() => handleMenuDropdownClose()}
                >
                  Upcoming
                </a>
              </Link>
            </li>
            <li>
              <Link href="/favourite">
                <a
                  className={`${styles.navOption} 
                  ${router.pathname == "/favourite" ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => handleMenuDropdownClose()}
                >
                  Favourite
                </a>
              </Link>
            </li>
            <li>
              <Link href="/top100">
                <a
                  className={`${styles.navOption} 
                  ${router.pathname == "/top100" ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => handleMenuDropdownClose()}
                >
                  Top 100
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/anime/${randomId}`}>
                <a
                  className={`${styles.navOption}`}
                  aria-current="page"
                  onClick={() => handleMenuDropdownClose()}
                >
                  Random anime
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
