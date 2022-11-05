import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import {
  useEffect, useMemo, useState
} from "react";
import { animeApi } from "../../../api/Anime_API";
import { useUserPreferences } from "../../../context/UserPreferencesProvider";
import useUpdateLayout from "../../../hooks/useUpdateLayout";
import LayoutChanger from "../../Shared/LayoutChanger";
import PageLoader from "../../Shared/PageLoader";
import TopTrendingList from "../AnimeTopTrending/TopTrendingList";
import AnimeFullWidthLayoutView from "./AnimeFullwidthLayout/AnimeFullWidthLayoutView";
import AnimeGridLayoutView from "./AnimeGridLayout/AnimeGridLayoutView";
import HomePagePagination from "./HomePagePagination";
import HomePagePaginationSkeleton from "./HomePagePaginationSkeleton";

const AnimeHome = ({
  title: pageTitle,
  paginate,
  children,
  currentPage
}: {
  title: string;
  paginate?: (pageNumber: number) => void;
  children?: JSX.Element;
  currentPage: number
}) => {

  const {
    data: animeData,
    isLoading: isAnimeDataLoading,
    isSuccess: isAnimeDataSuccess,
  } = useQuery(["anime-recent", currentPage], () =>
    animeApi.getRecentEpisodes({ page: currentPage })
  );

  //Preloading next page
  const nextPage = useMemo(() => currentPage + 1, [currentPage]);
  const { data: nextPageData } = useQuery(["anime-recent", nextPage], () =>
    animeApi.getRecentEpisodes({ page: nextPage })
  );

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

  if (!hasWindow) {
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
              setLayout(layout == "grid" ? "fullWidth" : "grid")
              updateLayout.mutate();
            }}
          >
            <div className="anime-home__header">
              <p className="text-lg md:text-xl section-heading">{pageTitle}</p>
              <div className="flex items-center md:w-auto gap-3">
                <LayoutChanger />
                {isAnimeDataLoading && <HomePagePaginationSkeleton />}
                {isAnimeDataSuccess && <HomePagePagination
                  paginate={paginate}
                  pagination={animeData.pagination}
                />}
              </div>
            </div>
            <Tab.Panels className={"mt-6"}>
              <Tab.Panel>
                <AnimeGridLayoutView anime={animeData?.anime ?? undefined} />
              </Tab.Panel>
              <Tab.Panel>
                <AnimeFullWidthLayoutView anime={animeData?.anime} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <div className="block self-center">
            {isAnimeDataLoading && <HomePagePaginationSkeleton />}
            {isAnimeDataSuccess && <HomePagePagination
              paginate={paginate}
              pagination={animeData.pagination}
            />}
          </div>
          <section>
            {children}
          </section>
        </div>
        <aside className="anime-home__sidebar">
          <div className="shadow-neumorphic p-4 rounded-[inherit] gap-2">
            <TopTrendingList />
          </div>
        </aside>
      </div>
    </>
  );
};

export default AnimeHome;
