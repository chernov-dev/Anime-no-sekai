import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import requests from "../utils/requests";
import PaginationComponent from "../components/ReactPagination/PaginationComponent";
import AnimeList from "../components/AnimeComponents/AnimeList";

export default function Home({ animes }) {
  const router = useRouter();
  const { page } = router.query;
  let pageCount = 10;

  const [pageState, pageSetState] = useState({
    loading: true,
    response: null,
    error: null,
  });

  // useEffect(() => {
  //   pageSetState({ loading: true });
  //   axios
  //     .get(
  //       `https://api.animetop.info/v1/last?${searchParams}&quantity=${itemsPerPage}`
  //     )
  //     .then((response) => {
  //       setAnimes(response.data.data);
  //       pageSetState({
  //         error: null,
  //         response: response.data.data,
  //         loading: false,
  //       });
  //     });
  // }, [searchParams, itemsPerPage]);

  return (
    <div>
      <Head>
        <title>ANS - Home</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AnimeList animeList={animes}>
          <PaginationComponent pageCount={7} currentPage={page} />
        </AnimeList>
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let currentPage = context.query.page ?? 1;
  let itemsPerPage = 8;
  const [animes] = await Promise.all([
    fetch(
      `${requests.fetchLastAnimes}?page=${currentPage}&quantity=${itemsPerPage}`,
      {
        method: "GET",
      }
    ).then((res) => res.json()),
  ]);
  return {
    props: {
      animes: animes.data,
    },
  };
};
