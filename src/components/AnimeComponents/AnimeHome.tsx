import { Tab } from "@headlessui/react";
import React, {
  Suspense,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { CgDisplayFullwidth, CgDisplayGrid } from "react-icons/cg";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { useUserPreferences } from "../../context/UserPreferencesProvider";
import { IAnimeResult } from "../../types/Anime";
import { IPagination } from "../../types/Pagination";
import LayoutChanger from "../Shared/LayoutChanger";
import PageLoader from "../Shared/PageLoader";
import Spinner from "../Shared/PageLoader";
import AnimeFullWidthLayoutView from "./AnimeFullWidthLayoutView";
import AnimeGridLayoutView from "./AnimeGridLayoutView";
import AnimeHomeFilter from "./AnimeHomeFilter";
import AnimeTrendingList from "./AnimeTrendingList";
import HomePagePagination from "./HomePagePagination";

const AnimeHome = ({
  anime,
  title: pageTitle,
  pagination,
  paginate,
  children,
}: {
  anime: IAnimeResult[];
  title: string;
  pagination?: IPagination;
  paginate?: (pageNumber: number) => void;
  children?: JSX.Element;
}) => {
  const { layout, setLayout }: any = useUserPreferences();
  const isGridLayout = layout == "grid" ? true : false;
  const isFullWidthLayout = layout == "fullWidth" ? true : false;
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  if (!hasWindow || !anime) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="anime-home">
        <div className="anime-home__container">
          <Tab.Group>
            <div className="anime-home__header">
              <p className="text-xl md:text-2xl">{pageTitle}</p>
              <div className="flex items-center md:w-auto gap-3">
                <LayoutChanger />
                {pagination && paginate && (
                  <HomePagePagination
                    paginate={paginate}
                    pagination={pagination}
                  />
                )}
              </div>
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <AnimeGridLayoutView anime={anime} />
              </Tab.Panel>
              <Tab.Panel>
                <AnimeFullWidthLayoutView anime={anime} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          {pagination && paginate && (
            <div className="block sm:hidden mb-3 self-center">
              <HomePagePagination paginate={paginate} pagination={pagination} />
            </div>
          )}
          {children}
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <aside className="anime-home__sidebar">
          <div className="shadow-neumorphic neumorphic-border p-4 rounded-[inherit] flex flex-col gap-2">
            <div className="section-heading pl-2">Trending anime</div>
            <AnimeTrendingList />
          </div>
        </aside>
      </div>
    </>
  );
};

export default AnimeHome;
