import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import AnimeGridLayoutView from "../components/AnimeComponents/AnimeGridLayoutView";
import AnimeTrendingList from "../components/AnimeComponents/AnimeTrendingList";
import HomePagePagination from "../components/AnimeComponents/HomePagePagination";
import PageLoader from "../components/Shared/PageLoader";
import Spinner from "../components/Shared/PageLoader";
import { useUserPreferences } from "../context/UserPreferencesProvider";
import { IAnimeResult } from "../types/Anime";
import { IPagination } from "../types/Pagination";

const PopularAnimeScreen = ({
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

  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <>
      <div className="anime-home">
        <div className="anime-home__container">
          <div className="anime-home__header">
            <p className="text-xl md:text-2xl">{pageTitle}</p>
            <div className="flex items-center md:w-auto gap-3">
              {pagination && paginate && (
                <HomePagePagination
                  paginate={paginate}
                  pagination={pagination}
                />
              )}
            </div>
          </div>
          {(!hasWindow || !anime) && <Spinner />}
          {anime && <AnimeGridLayoutView anime={anime} bullets={true} />}
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
          {children}
        </div>
        <aside className="anime-home__sidebar">
          <div className="text-neumorph-secondary text-xl md:text-2xl pl-2">
            Trending anime
          </div>
          <AnimeTrendingList />
        </aside>
      </div>
    </>
  );
};

export default PopularAnimeScreen;
