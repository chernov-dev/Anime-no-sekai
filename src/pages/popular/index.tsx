import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getAnimeTop } from "../../api/Anime_API/getAnimeTop";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import JikaiList from "../../components/AnimeComponents/JikaiList";
import AnimeHome from "../../components/AnimeComponents/AnimeHome";
import ProtectedWrapper from "../../components/AuthComponents/Protected";
import AnimeTopScreen from "../../screens/AnimeTopScreen";
import { CircleLoader, GridLoader, MoonLoader } from "react-spinners";
import Spinner from "../../components/Shared/PageLoader";
import PageLoader from "../../components/Shared/PageLoader";

const AnimePopularPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isSuccess } = useQuery(
    ["anime-top", currentPage],
    () => getAnimeTop(currentPage)
  );

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
        <PageLoader/>
    );
  }

  return (
    <ProtectedWrapper>
      <Head>
        <title>ANS - Top</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <AnimeTopScreen
            anime={data.anime}
            title={"Popular anime"}
            paginate={paginate}
            pagination={data.pagination}
          />
        </div>
      </main>
    </ProtectedWrapper>
  );
};

export default AnimePopularPage;
