import Head from "next/head";
import ProtectedWrapper from "../../components/AuthComponents/Protected";
import PopularAnimeScreen from "../../screens/PopularAnimeScreen";

const AnimePopularPage = () => {
  return (
    <ProtectedWrapper>
      <Head>
        <title>ANS - Top</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PopularAnimeScreen
          title={"Popular anime"}
        />
      </main>
    </ProtectedWrapper>
  );
};

export default AnimePopularPage;
