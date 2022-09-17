import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import React from "react";
import { getUpcomingAnimes } from "../../api/getUpcomingAnimes";
import JikaiList from "../../components/AnimeComponents/JikaiList";

const UpcomingAnimesPage = () => {
  const { data, isLoading, isSuccess } = useQuery(["anime-top"], () =>
    getUpcomingAnimes()
  );

  return (
    <>
      <Head>
        <title>ANS - Top</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="section-header">
          <h1 className="title">Upcoming next season</h1>
        </div>

        <div>
          <JikaiList animeArray={data} />
        </div>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["anime-top"], () => getUpcomingAnimes());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UpcomingAnimesPage;
