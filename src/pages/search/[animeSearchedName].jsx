import Head from "next/head";
import { useRouter } from "next/router";
import Error from "next/error";
import AnimeList from "../../components/AnimeComponents/AnimeList";
import { getAnimeByName } from "../../api/getAnimeByName";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

export default function Search() {
  let router = useRouter();
  const { animeSearchedName } = router.query;

  const { data, isLoading, status } = useQuery(
    ["searched-animes", animeSearchedName],
    () => getAnimeByName(animeSearchedName)
  );
  if (status != "success") {
    return (
      <Error
        statusCode={"404"}
        title={`Anime - "${animeSearchedName}" couldn't be found`}
      />
    );
  }

  return (
    <>
      <Head>
        <title>ANS - Search - {animeSearchedName}</title>
        <meta name="description" content={`Search - ${animeSearchedName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AnimeList animeList={data} />
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  let searchedName = context.query.animeSearchedName;

  await queryClient.prefetchQuery(["searched-animes", searchedName], () =>
    getAnimeByName(searchedName)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
