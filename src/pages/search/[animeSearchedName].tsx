import Head from "next/head";
import { useRouter } from "next/router";
import Error from "next/error";
import { getAnimesByName } from "../../api/getAnimesByName";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import JikaiList from "../../components/AnimeComponents/JikaiList";
import { IAnime } from "../../types/Anime";

export default function Search() {
  let router = useRouter();
  const { animeSearchedName } = router.query;

  const { data , isLoading, status } = useQuery(
    ["searched-animes", animeSearchedName],
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
    <>
      <Head>
        <title>ANS - Search - {animeSearchedName}</title>
        <meta name="description" content={`Search - ${animeSearchedName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <JikaiList animeArray={data} />
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  let searchedName = context.query.animeSearchedName;

  await queryClient.prefetchQuery(["searched-animes", searchedName], () =>
    getAnimesByName(searchedName)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
