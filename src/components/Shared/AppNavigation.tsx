import { DiCodeigniter } from 'react-icons/di';
import { FaVihara } from 'react-icons/fa';
import { HiCalendar, HiHeart, HiHome } from 'react-icons/hi';
import { NavigationOptionType } from '../../types/NavigationOption';
import { SearchInput } from '../Inputs/SearchInput';
import NavigationUserDropdownMenu from '../Navigation/Dropdown/NavigationUserDropdownMenu';
import Header from '../Navigation/Header/Header';
import NavigationMenu from '../Navigation/Header/NavigationMenu';
import NavigationOptions from '../Navigation/Header/NavigationOptions';
import Sidebar from '../Navigation/Sidebar/SideBar';
import WebsiteLogo from './WebsiteLogo';

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
        tooltip: "Recent anime"
    },
    {
        name: "Favorite",
        href: "/favourite",
        icon: <HiHeart size={22} />,
        accessKey: "x",
        tooltip: "Check out your favorite anime"
    },
    {
        name: "Popular",
        href: "/popular",
        icon: <DiCodeigniter size={22} />,
        accessKey: "c",
        tooltip: "Popular anime"
    },
    {
        name: "Upcoming",
        href: "/upcoming",
        icon: <HiCalendar size={22} />,
        accessKey: "v",
        tooltip: "Upcoming anime"
    },
    // {
    //   name: "Random",
    //   href: `/anime/${data}`,
    //   icon: <FaRandom size={18} />,
    //   accessKey: "v",
    // },
] as NavigationOptionType[];


const AppNavigation = () => {

    return (
        <>
            <Header>
                <div className='flex gap-10'>
                    <NavigationMenu options={navOptions} />
                    <WebsiteLogo />
                </div>
                <SearchInput />
                <NavigationUserDropdownMenu />
            </Header>
            <Sidebar>
                <NavigationOptions options={navOptions} />
            </Sidebar>
        </>
    )
}

export default AppNavigation