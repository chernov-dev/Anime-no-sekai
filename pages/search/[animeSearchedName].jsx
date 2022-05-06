import Head from "next/head";
import "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Error from "next/error";

import requests from "../../utils/requests";
import { AnimeContainerComponent } from "../../components/AnimeComponents/AnimeCard/AnimeContainerComponent";

export default function Search({ foundAnimes }) {
  let router = useRouter();
  const { animeSearchedName } = router.query;
  if (foundAnimes.error) {
    return (
      <Error
        statusCode={"404"}
        title={`Anime "${animeSearchedName}" couldn't be found`}
      />
    );
  }
  return (
    <div>
      <Head>
        <title>ANS - Search - {animeSearchedName}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="animeList">
          {foundAnimes.data.map((anime, index) => (
            <AnimeContainerComponent
              key={index}
              {...anime}
            ></AnimeContainerComponent>
          ))}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const [animeInfo] = await Promise.all([
    fetch(`${requests.fetchSearchAnime}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `name=${context.query.animeSearchedName}`,
    }).then((res) => res.json()),
  ]);

  return {
    props: {
      foundAnimes: { ...animeInfo },
    },
  };
};
