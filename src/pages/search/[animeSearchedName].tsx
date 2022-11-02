import Head from "next/head";
import { useRouter } from "next/router";
import SearchAnimeScreen from "../../screens/SearchAnimeScreen";

export default function SearchPage() {
  let router = useRouter();
  const { animeSearchedName } = router.query;

  return (
    <>
      <Head>
        <title>ANS - Search - {animeSearchedName}</title>
        <meta name="description" content={`Search - ${animeSearchedName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SearchAnimeScreen animeName={animeSearchedName} />
      </main>
    </>
  );
}
