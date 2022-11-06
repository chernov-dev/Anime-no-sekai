import { FaVihara } from "react-icons/fa"
import { SearchInput } from "../Inputs/SearchInput"
import NavigationUserDropdownMenu from "./Dropdown/NavigationUserDropdownMenu"
import Header from "./Header/Header"

const MobileNavigation = ({ navOptions }) => {
    return (
        <>
            <Header className="fixed shadow-neumorphic">
                <div className="flex gap-10">
                    <div className="neumorphic-btn primary">
                        <FaVihara size={32} />
                    </div>
                </div>
                <SearchInput />
                <NavigationUserDropdownMenu />
            </Header>

        </>
    )
}

export default MobileNavigation