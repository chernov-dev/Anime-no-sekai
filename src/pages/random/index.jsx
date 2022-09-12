import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import { getRandomAnime } from "../../api/getRandomAnime";
import AnimeDetails from "../../components/AnimeComponents/AnimeDetails";

const RandomPage = () => {
  const { data, isLoading, isError, error } = useQuery(
    ["random-anime"],
    () => getRandomAnime(),
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <main>
      <div className="animeList">
        <AnimeDetails animeInfo={data} />
      </div>
    </main>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["random-anime"], () => getRandomAnime());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default RandomPage;
