import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getAnimeTop } from "../../api/getAnimeTop";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import JikaiList from "../../components/AnimeComponents/JikaiList";

const Top100Page = () => {
  const { data, isLoading, isSuccess } = useQuery(["anime-top"], () =>
    getAnimeTop("tv")
  );
 
  if(isLoading) { 
    return ( <div>Loading...</div>)
  }

  return (
    <>
      <Head>
        <title>ANS - Top</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="section-header">
          <h1 className="title">Top 100</h1>
        </div>

        <div>
          <JikaiList animeArray={data}/>
        </div>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["anime-top"], () => getAnimeTop("tv"));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Top100Page;
