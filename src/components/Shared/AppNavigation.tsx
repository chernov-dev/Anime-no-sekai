import { AiFillHeart } from "react-icons/ai";
import { DiCodeigniter } from "react-icons/di";
import { FaVihara } from "react-icons/fa";
import { HiCalendar, HiHome } from "react-icons/hi";
import { NavigationOptionType } from "../../types/NavigationOption";
import DekstopNavigation from "../Navigation/DekstopNavigation";
import MobileNavigation from "../Navigation/MobileNavigation";

export const navOptions = [
  {
    name: "Welcome",
    href: "",
    icon: <FaVihara size={22} />,
    accessKey: "/",
  },
  {
    name: "Home",
    href: "/home",
    icon: <HiHome size={22} />,
    accessKey: "z",
    tooltip: "Recent anime",
  },
  {
    name: "Popular",
    href: "/popular",
    icon: <DiCodeigniter size={22} />,
    accessKey: "c",
    tooltip: "Popular anime",
  },
  {
    name: "Upcoming",
    href: "/upcoming",
    icon: <HiCalendar size={22} />,
    accessKey: "v",
    tooltip: "Upcoming anime",
  },
  {
    name: "Favorite",
    href: "/profile",
    icon: <AiFillHeart size={22} />,
    accessKey: "x",
    tooltip: "Check out your favorite anime",
  },

  // {
  //   name: "Random",
  //   href: `/anime/${data}`,
  //   icon: <FaRandom size={18} />,
  //   accessKey: "v",
  // },
] as NavigationOptionType[];

const AppNavigation = ({ isMobile }) => {
  return (
    <>
      {isMobile ? (
        <MobileNavigation navOptions={navOptions} />
      ) : (
        <DekstopNavigation navOptions={navOptions} />
      )}
    </>
  );
};

export default AppNavigation;
