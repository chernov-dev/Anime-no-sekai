import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import AnimeHome from "../../components/AnimeComponents/AnimeHome";
import { getRecentAnimes } from "../../api/Anime_API/getRecentAnimes";
import ProtectedWrapper from "../../components/AuthComponents/Protected";

import AnimeHeroSwiper from "../../components/AnimeComponents/AnimeHeroSwiper";
import { getAnimeTrending } from "../../api/Anime_API/getAnimeTrending";
import { useState, useMemo } from "react";
import { IAnimeTypeFilter } from "../../types/Anime";
import PageLoader from "../../components/Shared/PageLoader";

function HomePage() {
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
    <ProtectedWrapper>
      <Head>
        <title>ANS - Home</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isTrendingSuccess && <AnimeHeroSwiper animeList={trendingAnime} />}

      {isSuccess && (
        <>
          <AnimeHome
            anime={animeData.anime}
            title="Recently added"
            paginate={paginate}
            pagination={animeData.pagination}
          />
        </>
      )}
      {/* <JikaiList animeArray={data}>
          <PaginationComponent pageCount={7} currentPage={currentPage} />
        </JikaiList> */}
    </ProtectedWrapper>
  );
}

// export const getServerSideProps = async (context) => {
//   const queryClient = new QueryClient();
//   let currentPage = context.query.page ?? 1;
//   await queryClient.prefetchQuery(["recent-anime", currentPage], () =>
//     getRecentAnimes(currentPage)
//   );

//   return {
//     props: {
//       currentPage,
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default HomePage;
