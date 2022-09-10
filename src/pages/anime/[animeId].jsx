import Head from "next/head";
import AnimePlayer from "../../components/AnimeComponents/AnimePlayer/AnimePlayer";
import AnimeDetails from "../../components/AnimeComponents/AnimeDetails";
import { getAnimeById } from "../../api/getAnimeById";
import { getPlaylistById } from "../../api/getPlaylistById";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Error from "next/error";
import { useRouter } from "next/router";

export default function AnimeDetailsPage() {
  const router = useRouter();
  const { animeId } = router.query;

  const {
    data: animeDetails,
    isLoading: isAnimeLoading,
    isSuccess: isAnimeSuccess,
  } = useQuery(["anime-details", animeId], () => getAnimeById(animeId));

  const {
    data: animePlaylist,
    isLoading: isPlayerLoading,
    isSuccess: isPlayerSuccess,
  } = useQuery(["anime-playlist", animeId], () => getPlaylistById(animeId));

  {
    isAnimeLoading && <div className="text-center">Loading anime..</div>;
  }

  if (!isAnimeSuccess) {
    return <Error statusCode={"404"} title={`Anime couldn't be found`} />;
  }

  return (
    <>
      <Head>
        <title>ANS - {animeDetails.title}</title>
        <meta name="description " content={`ANS - ${animeDetails.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="animeList">
          <AnimeDetails animeInfo={animeDetails} />
          <div className="anime-player">
            {isPlayerLoading && (
              <div className="text-center w-full text-slate-400">
                Loading player
              </div>
            )}
            <AnimePlayer
              animePlayList={animePlaylist}
              animeTitle={animeDetails.title}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { animeId } = context.query;

  await queryClient.prefetchQuery(["anime-details", animeId], () =>
    getAnimeById(animeId)
  );
  await queryClient.prefetchQuery(["anime-playlist", animeId], () =>
    getPlaylistById(animeId)
  );

  return {
    props: {
      animeId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
