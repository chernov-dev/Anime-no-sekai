import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { animeApi } from "../api/Anime_API";
import UpcomingAnimeCard from "../components/AnimeComponents/AnimeUpcomingCard/UpcomingAnimeCard";
import PageLoader from "../components/Shared/PageLoader";
import Spinner from "../components/Shared/Spinner";
import { IAnimeResult } from "../types/Anime";

const UpcomingAnimeScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isSuccess } = useQuery(["anime-upcoming"], () =>
    animeApi.getUpcomingAnimes()
  );

  if (isLoading) {
    return <PageLoader />;
  }

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };
  return (
    <div className="flex flex-col max-w-[1000px] items-center">
      <p className="text-xl md:text-2xl text-neumorph-secondary py-1">
        Upcoming
      </p>
      <div className={`anime-home__grid`}>
        {isLoading && <Spinner />}
        {data &&
          data.data.map((anime: IAnimeResult, index) => (
            <UpcomingAnimeCard key={`${anime.mal_id}`} anime={anime} />
          ))}
      </div>
      {/* <AnimeGridLayoutView
            anime={upcomingAnime.data}
            ratingStatus={false}
            epStatus={false}
          /> */}
    </div>
  );
};

export default UpcomingAnimeScreen;
