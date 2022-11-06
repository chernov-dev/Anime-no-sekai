import { SearchInput } from "../Inputs/SearchInput"
import WebsiteLogo from "../Shared/WebsiteLogo"
import NavigationUserDropdownMenu from "./Dropdown/NavigationUserDropdownMenu"
import Header from "./Header/Header"
import NavigationMenu from "./Header/NavigationMenu"
import NavigationOptions from "./Header/NavigationOptions"
import Sidebar from "./Sidebar/SideBar"

const DekstopNavigation = ({ navOptions }) => {
    return (
        <>
            <Header>
                <div className="flex gap-10">
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

export default DekstopNavigation