import Head from "next/head";
import { useRouter } from "next/router";
import Error from "next/error";
import { getAnimesByName } from "../../api/Anime_API/getAnimesByName";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import AnimeHome from "../../components/AnimeComponents/AnimeHome";
import ProtectedWrapper from "../../components/AuthComponents/Protected";

export default function Search() {
  let router = useRouter();
  const { animeSearchedName } = router.query;

  const { data , isLoading, status } = useQuery(
    ["anime-search", animeSearchedName],
    () => getAnimesByName(animeSearchedName)
  );
  if (status == "success" && data.length == 0) {
    return (
      <Error
      //@ts-expect-error
        statusCode={"404"}
        title={`Anime - "${animeSearchedName}" couldn't be found`}
      />
    );
  }

  return (
    <ProtectedWrapper>
      <Head>
        <title>ANS - Search - {animeSearchedName}</title>
        <meta name="description" content={`Search - ${animeSearchedName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AnimeHome anime={data} title={`${animeSearchedName.toString().toUpperCase()} - Search`}/>
      </main>
    </ProtectedWrapper>
  );
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  let searchedName = context.query.animeSearchedName;

  await queryClient.prefetchQuery(["anime-search", searchedName], () =>
    getAnimesByName(searchedName)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
