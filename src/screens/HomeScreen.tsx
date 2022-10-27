import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { animeApi } from "../api/Anime_API";
import { getAnimeTopAiring } from "../api/Anime_API/getAnimeTopAiring";
import AnimeHeroSwiper from "../components/AnimeComponents/AnimeHero/AnimeHeroSwiper";
import AnimeHome from "../components/AnimeComponents/AnimeHome/AnimeHome";
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
    animeApi.getRecentEpisodes(currentPage)
  );

  //Preloading next page
  const nextPage = useMemo(() => currentPage + 1, [currentPage]);
  const { data: nextPageData } = useQuery(["anime-recent", nextPage], () =>
    animeApi.getRecentEpisodes(nextPage)
  );


  const {
    data: trendingAnime,
    isLoading: isTrendingLoading,
    isSuccess: isTrendingSuccess,
  } = useQuery(["anime-trending"], () => getAnimeTopAiring());

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  return (
    <>
      {isTrendingSuccess && <AnimeHeroSwiper animeList={trendingAnime} />}

      {isLoading && <PageLoader /> }
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
