import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import PaginationComponent from "../components/ReactPagination/PaginationComponent";
import AnimeList from "../components/AnimeComponents/AnimeList";
import { getAiringAnimes } from "../api/getAiringAnimes";
import JikaiList from "../components/AnimeComponents/JikaiList";

function HomePage({ currentPage }) {
  const { data, isLoading } = useQuery(["animes", currentPage], () =>
  getAiringAnimes(currentPage)
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
        <div className="section-header">
          <h1 className="title">Airing right now</h1>
        </div>
        <JikaiList animeArray={data}>
          <PaginationComponent pageCount={7} currentPage={currentPage} />
        </JikaiList>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  let currentPage = context.query.page ?? 1;
  await queryClient.prefetchQuery(["animes", currentPage], () =>
  getAiringAnimes(currentPage)
  );

  return {
    props: {
      currentPage,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
