import { useRouter } from "next/router";
import { SVGProps, useState } from "react";

export const SearchInput = ({ }) => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.length > 0) router.push(`/search/${searchInput}`);
  };

  // const handleUserKeyPress = (event) => {
  //   let search = document.getElementById("search-input");
  //   if (event.key === "s") {
  //     setTimeout(() => {
  //       search.focus();
  //     }, 0);
  //   }
  // };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // useEffect(() => {
  //   document.addEventListener("keypress", handleUserKeyPress);
  //   return () => {
  //     window.removeEventListener("keydown", handleUserKeyPress);
  //   };
  // }, []);

  return (
    <>
      <div
      >
        <form className="flex items-center min-w-[10rem] w-fit" onSubmit={handleSearch}>
          <label htmlFor="search-input" className="sr-only">
            Search
          </label>
          <div className="neumorphic-search">
            <input
              accessKey="s"
              type="text"
              id="search-input"
              placeholder="Search"
              enterKeyHint="search"
              onChange={handleSearchChange}
              required
            />
            <div className="neumorphic-search__icon">
              <svg
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                  color="currentColor"
                ></path>
              </svg>
            </div>
            <div
              className="neumorphic-search__icon right-0 items-center"
              id="keyIcon"
              title="⚡ Try ALT + S combination to open search bar ⚡"
            >
              <SearchKeyboardKeyIcon
                height={"100%"}
                className={"hidden lg:block"}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export const SearchKeyboardKeyIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.2em"
        height="1.2em"
        viewBox="0 0 256 256"
        fill="rgb(var(--primary)/0.5)"
        stroke="rgb(var(--neumorph-accent))"
        {...props}
      >
        <path d="M16.5 1.4C11.4 3.6 6.8 8.2 4.4 13.5l-2.4 5v219l2.4 5c2.5 5.4 7.1 10 12.3 12.2 4.8 1.9 217.8 1.9 222.6 0 5.2-2.2 9.8-6.8 12.3-12.2l2.4-5v-219l-2.4-5c-2.5-5.4-7.1-10-12.3-12.2C234.6-.6 21-.6 16.5 1.4zm192.4 26.7c6.9 1.5 12.3 5.6 15.5 12l2.6 5.3v165.2l-2.6 5.3c-3.2 6.4-8.6 10.5-15.5 12s-154.9 1.5-161.8 0c-6.9-1.5-12.3-5.6-15.5-12l-2.6-5.3V45.4l2.6-5.2c3.1-6.2 7.7-10.1 14.2-11.8 6.2-1.7 155.5-2 163.1-.3z" />
        <path d="M44.5 37.9c-1.7 1-4 3.1-5 4.7-1.9 2.8-2 5.2-2 85.4v82.5l2.3 3.3c4.7 6.5 0 6.2 88.2 6.2s83.5.3 88.2-6.2l2.3-3.3v-165l-2.3-3.3c-4.7-6.5 0-6.2-88.4-6.2-76.5 0-80.4.1-83.3 1.9zM109 50.1c5.6 1.2 13.3 6 16.4 10.2 1.4 1.8 2.1 4.8 2.4 9.2l.4 6.5H103v-9H75.9l.3 7.6.3 7.7 22 11.9c23.5 12.8 26 14.5 28.1 19.5 1.8 4.3 1.8 20.3 0 24.6-1.8 4.3-6.1 8.1-12.1 10.9-4.4 2-7 2.3-21.6 2.6-19.4.5-25.8-.6-32.6-5.1-6-4-8.1-7.8-8.9-15.5l-.7-6.2H77v9h26v-15.8L81.8 107c-11.7-6.2-22.5-12.1-24.1-13.2-5-3.5-6.2-7.2-6.2-18.8 0-9.3.3-10.9 2.4-14.3 2.9-4.7 8.6-8.6 14.9-10.3 5.9-1.6 33.3-1.8 40.2-.3z" />
      </svg>
    </>
  );
};
