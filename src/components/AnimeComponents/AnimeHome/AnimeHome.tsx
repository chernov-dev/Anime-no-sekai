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
import { useUserPreferences } from "../../../context/UserPreferencesProvider";
import { IAnimeResult } from "../../../types/Anime";
import { IPagination } from "../../../types/Pagination";
import LayoutChanger from "../../Shared/LayoutChanger";
import PageLoader from "../../Shared/PageLoader";
import Spinner from "../../Shared/PageLoader";
import AnimeFullWidthLayoutView from "../AnimeFullwidthLayout/AnimeFullWidthLayoutView";
import AnimeGridLayoutView from "../AnimeGridLayout/AnimeGridLayoutView";
import AnimeHomeFilter from "./AnimeHomeFilter";
import TopTrendingList from "../AnimeTopTrending/TopTrendingList";
import HomePagePagination from "./HomePagePagination";
import useUpdateLayout from "../../../hooks/useUpdateLayout";
import { type } from "os";

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

  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState(
    layout === "grid" ? 0 : 1
  );

  const updateLayout = useUpdateLayout();

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
          <Tab.Group
            selectedIndex={selectedLayoutIndex}
            onChange={(i) => {
              setSelectedLayoutIndex(i);
              updateLayout.mutate();
            }}
          >
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
        <aside className="anime-home__sidebar">
          <div className="shadow-neumorphic neumorphic-border p-4 rounded-[inherit] gap-2">
            <TopTrendingList />
          </div>
        </aside>
      </div>
    </>
  );
};

export default AnimeHome;
