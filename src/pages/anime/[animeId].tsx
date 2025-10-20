import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { animeApi } from "../../api/Anime_API";
import AnimeDetailsScreen from "../../screens/AnimeDetailsScreen";

export default function AnimeDetailsPage() {
  const router = useRouter();
  const { animeId } = router.query;

  const {
    data: animeDetails,
    isLoading: isAnimeLoading,
    isSuccess: isAnimeSuccess,
  } = useQuery({
    queryKey: ["anime-details", animeId],
    queryFn: () => animeApi.getAnimeById(+animeId)
  });

  // const {
  //   data: animePlaylist,
  //   isLoading: isPlayerLoading,
  //   isSuccess: isPlayerSuccess,
  // } = useQuery(["anime-playlist", animeId], () => getPlaylistById(animeId));

  if (isAnimeSuccess && animeDetails) {
    return (
      <>
        <Head>
          <title>ANS - {animeDetails.title.english}</title>
          <meta
            name="description "
            content={`ANS - ${animeDetails.title.english}`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AnimeDetailsScreen animeDetails={animeDetails} />
      </>
    );
  }
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { animeId } = context.query;

  await queryClient.prefetchQuery({
    queryKey: ["anime-details", animeId],
    queryFn: () => animeApi.getAnimeById(animeId)
  });
  // await queryClient.prefetchQuery(["anime-playlist", animeId], () =>
  //   getPlaylistById(animeId)
  // );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
