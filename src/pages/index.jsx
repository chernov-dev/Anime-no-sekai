import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import PaginationComponent from "../components/ReactPagination/PaginationComponent";
import AnimeList from "../components/AnimeComponents/AnimeList";
import { getLastAnimes } from "../api/getLastAnimes";

function HomePage({ currentPage }) {
  const { data, isLoading } = useQuery(["animes"], () =>
    getLastAnimes(currentPage)
  );

  {
    isLoading && <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>ANS - Home</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AnimeList animeList={data}>
          <PaginationComponent pageCount={7} currentPage={currentPage} />
        </AnimeList>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  let currentPage = context.query.page ?? 1;

  await queryClient.prefetchQuery(["animes"], () => getLastAnimes(currentPage));

  return {
    props: {
      currentPage,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;