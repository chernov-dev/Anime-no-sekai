import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import requests from "../utils/requests";
import { AnimeContainerComponent } from "../components/AnimeComponents/AnimeCard/AnimeContainerComponent";
import PaginationComponent from "../components/ReactPagination/PaginationComponent";

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
    <div className={styles.container}>
      <Head>
        <title>ANS - Home</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="animeList">
          {animes.map((anime, index) => (
            <AnimeContainerComponent key={index} {...anime} />
          ))}
          <PaginationComponent pageCount={7} currentPage={page} />
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let currentPage = context.query.page ?? 1;
  let itemsPerPage = 6;
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
