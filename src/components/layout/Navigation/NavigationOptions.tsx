
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";

const NavigationOptions = ({ options }) => {
  const router = useRouter();

  return (
    <>
      <Tab.Group>
        <Tab.List className="w-[60%] hidden md:flex neumorphic-tab__list">
          {options.map((option) => (
              <Tab
                key={option.name}
                accessKey={option.accessKey}
                onClick={() => {
                  router.push(option.href);
                }}
              >
                {option.name}
              </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      {/* <div
        className={`${
          showMenu
            ? "block neumorphic-dropdown"
            : "hidden neumorphic-navigation-group"
        } w-full lg:w-[900px]`}
        id="navbar-sticky"
      >
        <ul>
          <li>
            <Link href="/home">
              <a
                className={`${currentPath == "/home" ? "link-active" : ""}`}
                aria-current="page"
                onClick={() => handleMenuDropdownClose()}
              >
                Home
              </a>
            </Link>
          </li>

          <li>
            <Link href="/upcoming">
              <a
                className={`${currentPath == "/upcoming" ? "link-active" : ""}`}
                aria-current="page"
                onClick={() => handleMenuDropdownClose()}
              >
                Upcoming
              </a>
            </Link>
          </li>
          <li>
            <Link href="/popular">
              <a
                className={`
            ${currentPath == "/popular" ? "link-active" : ""}`}
                aria-current="page"
                onClick={() => handleMenuDropdownClose()}
              >
                Popular
              </a>
            </Link>
          </li>
          <li>
            <Link href="/favourite">
              <a
                className={`
                  ${currentPath == "/favourite" ? "link-active" : ""}`}
                aria-current="page"
                onClick={() => handleMenuDropdownClose()}
              >
                Favourite
              </a>
            </Link>
          </li>
          <li>
              <Link href={`/anime/`}>
                <a aria-current="page" onClick={() => handleMenuDropdownClose()}>
                  Random
                </a>
              </Link>
            </li>
        </ul>
      </div> */}
    </>
  );
};

export default NavigationOptions;
