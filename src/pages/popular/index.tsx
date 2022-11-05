import Head from "next/head";
import PopularAnimeScreen from "../../screens/PopularAnimeScreen";

const AnimePopularPage = () => {
  return (
    <>
      <Head>
        <title>ANS - Top</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PopularAnimeScreen
        title={"Popular anime"}
      />
    </>
  );
};

export default AnimePopularPage;
