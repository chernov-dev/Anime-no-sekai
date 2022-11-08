import useMobileDetect from "../../utils/useMobile";
import BottomBar from "../Navigation/BottomBar/BottomBar";
import MobileNavigationOptions from "../Navigation/Header/MobileNavigationOptions";
import AppContent from "./AppContent";
import AppNavigation, { navOptions } from "./AppNavigation";

const AppLayout = ({ children }) => {
  const mobileDetect = useMobileDetect();
  const isMobile = mobileDetect.isMobile();

  return (
    <>
      <AppNavigation isMobile={isMobile} />
      <AppContent content={children} />
      {isMobile && (
        <BottomBar>
          <MobileNavigationOptions options={navOptions} />
        </BottomBar>
      )}
    </>
  );
};

export default AppLayout;
