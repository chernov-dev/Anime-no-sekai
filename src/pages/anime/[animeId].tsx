import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import ProtectedWrapper from "../../components/AuthComponents/Protected";
import AnimeDetailsScreen from "../../screens/AnimeDetailsScreen";
import { animeApi } from "../../api/Anime_API";

export default function AnimeDetailsPage() {
  const router = useRouter();
  const { animeId } = router.query;

  const {
    data: animeDetails,
    isLoading: isAnimeLoading,
    isSuccess: isAnimeSuccess,
  } = useQuery(["anime-details", animeId], () => animeApi.getAnimeById(+animeId));

  // const {
  //   data: animePlaylist,
  //   isLoading: isPlayerLoading,
  //   isSuccess: isPlayerSuccess,
  // } = useQuery(["anime-playlist", animeId], () => getPlaylistById(animeId));

  if (isAnimeSuccess && animeDetails) {
    return (
      <ProtectedWrapper>
        <Head>
          <title>ANS - {animeDetails.title.english}</title>
          <meta
            name="description "
            content={`ANS - ${animeDetails.title.english}`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex items-center flex-col justify-center">
          <AnimeDetailsScreen animeDetails={animeDetails}/>
        </main>
      </ProtectedWrapper>
    );
  }
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { animeId } = context.query;

  await queryClient.prefetchQuery(["anime-details", animeId], () =>
    animeApi.getAnimeById(animeId)
  );
  // await queryClient.prefetchQuery(["anime-playlist", animeId], () =>
  //   getPlaylistById(animeId)
  // );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
