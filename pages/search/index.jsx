import Head from "next/head";
import "../../styles/Home.module.css";
import requests from "../../utils/requests";
import { AnimeContainerComponent } from "../../components/AnimeComponents/AnimeCard/AnimeContainerComponent";

export default function Search({ foundAnimes }) {
  return (
    <div>
      <Head>
        <title>ANS - Search</title>
        <meta name="description" content="ANS search" />
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

export const getServerSideProps = async () => {
  const [foundAnimes] = await Promise.all([
    fetch(`${requests.fetchSearchAnime}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `name=black`,
    }).then((res) => res.json()),
  ]);
  return {
    props: {
      foundAnimes: { ...foundAnimes },
    },
  };
};
