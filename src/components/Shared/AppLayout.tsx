import useMobileDetect from "../../utils/useMobile";
import BottomBar from "../Navigation/BottomBar/BottomBar";
import MobileNavigationOptions from "../Navigation/Header/MobileNavigationOptions";
import AppNavigation, { navOptions } from "./AppNavigation";

const AppLayout = ({ children }) => {
    const mobileDetect = useMobileDetect();

    return (
        <>
            <AppNavigation />
            <main
                className={`${mobileDetect.isMobile() === true ? "mobile-layout" : "desktop-layout"
                    }`}
            >
                {children}
            </main>
            {mobileDetect.isMobile() && (<>
                <BottomBar>
                    <MobileNavigationOptions options={navOptions} />
                </BottomBar>
            </>)}
        </>
    );
};

export default AppLayout;
