import Link from "next/link"
import { FaVihara } from "react-icons/fa"
import { SearchInput } from "../Inputs/SearchInput"
import NavigationUserDropdownMenu from "./Dropdown/NavigationUserDropdownMenu"
import Header from "./Header/Header"

const MobileNavigation = ({ navOptions }) => {
    return (
        <>
            <Header className="fixed shadow-neumorphic bg-neumorph-primary">
                <div className="flex gap-10">
                    <Link href="/" className="neumorphic-btn primary">
                        <FaVihara size={32} />
                    </Link>
                </div>
                <SearchInput />
                <NavigationUserDropdownMenu />
            </Header>

        </>
    )
}

export default MobileNavigation