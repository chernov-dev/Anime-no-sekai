import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { getAnimeTrending } from "../api/Anime_API/getAnimeTrending";
import { getRecentAnimes } from "../api/Anime_API/getRecentAnimes";
import AnimeHeroSwiper from "../components/AnimeComponents/AnimeHeroSwiper";
import AnimeHome from "../components/AnimeComponents/AnimeHome";
import AnimeSchedule from "../components/AnimeComponents/AnimeSchedule/AnimeSchedule";
import PageLoader from "../components/Shared/PageLoader";
import { IAnimeTypeFilter } from "../types/Anime";

const HomeScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [filterType, setFilterType] = useState({} as IAnimeTypeFilter);

  const {
    data: animeData,
    isLoading,
    isSuccess,
  } = useQuery(["anime-recent", currentPage], () =>
    getRecentAnimes(currentPage)
  );

  const nextPage = useMemo(() => currentPage + 1, [currentPage]);
  const { data: nextPageData } = useQuery(["anime-recent", nextPage], () =>
    getRecentAnimes(nextPage)
  );

  const {
    data: trendingAnime,
    isLoading: isTrendingLoading,
    isSuccess: isTrendingSuccess,
  } = useQuery(["anime-trending"], () => getAnimeTrending());

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  {
    isLoading && <PageLoader />;
  }

  return (
    <>
      {isTrendingSuccess && <AnimeHeroSwiper animeList={trendingAnime} />}

      {isSuccess && (
        <>
          <AnimeHome
            anime={animeData.anime}
            title="Recently added"
            paginate={paginate}
            pagination={animeData.pagination}
          >
            <AnimeSchedule />
          </AnimeHome>
        </>
      )}
    </>
  );
};

export default HomeScreen;
