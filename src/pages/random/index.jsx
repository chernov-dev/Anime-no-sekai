import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import { getRandomAnime } from "../../api/getRandomAnime";
import AnimeDetails from "../../components/AnimeComponents/AnimeDetails";

const RandomPage = () => {
  const { data, isLoading, isError, error } = useQuery(
    ["random-anime"],
    () => getRandomAnime(),
    { refetchOnWindowFocus: false }
  );

  if (isLoading) return <main className="text-center">Loading...</main>;

  if (isError) return <div>{error.message}</div>;

  return (
    <main>
      <div className="animeList">
        <AnimeDetails animeInfo={data} />
      </div>
    </main>
  );
};

export default RandomPage;
