import useMobileDetect from "../../utils/useMobile";

const AppContent = ({ content }) => {
  const mobileDetect = useMobileDetect();
  const isMobile = mobileDetect.isMobile();

  return (
    <>
      <main
        className={`${
          mobileDetect.isMobile() === true ? "mobile-layout" : "desktop-layout"
        }`}
      >
        {content}
      </main>
    </>
  );
};

export default AppContent;
