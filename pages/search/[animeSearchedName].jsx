import Head from "next/head";
import "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Error from "next/error";
import requests from "../../utils/requests";
import AnimeList from "../../components/AnimeComponents/AnimeList";

export default function Search({ searchResult }) {
  let router = useRouter();
  const { animeSearchedName } = router.query;
  if (searchResult.error) {
    return (
      <Error
        statusCode={"404"}
        title={`Anime - "${animeSearchedName}" couldn't be found`}
      />
    );
  }

  return (
    <div>
      <Head>
        <title>ANS - Search - {animeSearchedName}</title>
        <meta name="description" content={`Search - ${animeSearchedName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AnimeList animeList={searchResult.data} />
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const [animeSearchResult] = await Promise.all([
    fetch(`${requests.fetchSearchAnime}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `name=${context.query.animeSearchedName}`,
    }).then((res) => res.json()),
  ]);
  return {
    props: {
      searchResult: { ...animeSearchResult },
    },
  };
};
