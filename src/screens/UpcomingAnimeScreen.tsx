import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { animeApi } from "../api/Anime_API";
import UpcomingAnimeCard from "../components/AnimeComponents/AnimeUpcomingCard/UpcomingAnimeCard";
import TopAiringList from "../components/AnimeComponents/TopAiringList";
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
    <div className="anime-home">
      <div className="anime-home__container">
        <div className="anime-home__header">
          <p className="text-xl md:text-2xl">Upcoming</p>
        </div>
        <div className={`anime-home__grid`}>
          {isLoading && <Spinner />}
          {data &&
            data.data.map((anime: IAnimeResult, index) => (
              <UpcomingAnimeCard key={`${anime.mal_id}`} anime={anime} />
            ))}
        </div>
      </div>
      <aside className="anime-home__sidebar">
        <div className="shadow-neumorphic neumorphic-border p-4 rounded-[inherit] gap-2">
          <TopAiringList />
        </div>
      </aside>
    </div>
  );
};

export default UpcomingAnimeScreen;
