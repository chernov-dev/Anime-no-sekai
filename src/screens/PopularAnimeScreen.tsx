import { useEffect, useState } from "react";
import AnimeGridLayoutView from "../components/AnimeComponents/AnimeGridLayout/AnimeGridLayoutView";
import TopTrendingList from "../components/AnimeComponents/AnimeTopTrending/TopTrendingList";
import HomePagePagination from "../components/AnimeComponents/AnimeHome/HomePagePagination";
import PageLoader from "../components/Shared/PageLoader";
import Spinner from "../components/Shared/PageLoader";
import { useUserPreferences } from "../context/UserPreferencesProvider";
import { useQuery } from "@tanstack/react-query";
import { animeApi } from "../api/Anime_API";

const PopularAnimeScreen = ({
  title: pageTitle,
  children,
}: {
  title: string;
  children?: JSX.Element;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isSuccess } = useQuery(
    ["anime-popular", currentPage],
    () => animeApi.getPopular(currentPage)
  );

  // const paginate = (pageNumber: number) => {
  //   return setCurrentPage(pageNumber);
  // };

  return (
    <>
      <div className="anime-home">
        <div className="anime-home__container">
          <div className="anime-home__header">
            <p className="text-xl md:text-2xl">{pageTitle}</p>
          </div>
          {isLoading && <Spinner />}
          {isSuccess && (
            <AnimeGridLayoutView anime={data.anime} bullets={true} />
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

export default PopularAnimeScreen;
