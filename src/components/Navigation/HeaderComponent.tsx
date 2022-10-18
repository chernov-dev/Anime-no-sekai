import { BsStar } from "react-icons/bs";
import { CgCalendarNext, CgHeart, CgHome } from "react-icons/cg";
import { FaRandom } from "react-icons/fa";

import NavigationMenu from "./NavigationMenu";
import NavigationOptions from "./NavigationOptions";
import UserDropdownMenu from "./UserDropdownMenu";
import { useQuery } from "@tanstack/react-query";
import WebsiteLogo from "../Shared/WebsiteLogo";
import { SearchInput } from "../Inputs/SearchInput";
import useScrollDirection from "../../utils/useScrollDirection";


const HeaderComponent = () => {

  const scrollDirection = useScrollDirection();

  // const { data, isLoading, isSuccess, refetch } = useQuery(["random-anime-id"], () =>
  //   getRandomAnimeId()
  // );
  
const MenuOptions = [
  {
    name: "Home",
    href: "/home",
    icon: <CgHome size={18} />,
    accessKey: "z",
  },
  {
    name: "Popular",
    href: "/popular",
    icon: <BsStar size={18} />,
    accessKey: "x",
  },
  {
    name: "Upcoming",
    href: "/upcoming",
    icon: <CgCalendarNext size={18} />,
    accessKey: "c",
  },
  // {
  //   name: "Random",
  //   href: `/anime/${data}`,
  //   icon: <FaRandom size={18} />,
  //   accessKey: "v",
  // },
];

  return (
    <nav className={`neumorphic-nav ${scrollDirection === "down" ? "-top-24" : "top-0"}`}>
      <div className="flex items-center gap-4 justify-between">
        <div>
          <NavigationMenu options={MenuOptions} />
          <WebsiteLogo />
        </div>
        <NavigationOptions options={MenuOptions} />
        <SearchInput />
        <UserDropdownMenu />
      </div>
    </nav>
  );
};

export default HeaderComponent;
