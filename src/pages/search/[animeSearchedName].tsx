import Head from "next/head";
import { useRouter } from "next/router";
import ProtectedWrapper from "../../components/AuthComponents/Protected";
import SearchAnimeScreen from "../../screens/SearchAnimeScreen";

export default function SearchPage() {
  let router = useRouter();
  const { animeSearchedName } = router.query;

  return (
    <ProtectedWrapper>
      <Head>
        <title>ANS - Search - {animeSearchedName}</title>
        <meta name="description" content={`Search - ${animeSearchedName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SearchAnimeScreen animeName={animeSearchedName}/>
      </main>
    </ProtectedWrapper>
  );
}
