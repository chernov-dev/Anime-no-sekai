import Head from "next/head";
import AnimePlayer from "../../components/AnimeComponents/AnimePlayer/AnimePlayer";
import AnimeDetails from "../../components/AnimeComponents/AnimeDetails";
import { getAnimeById } from "../../api/getAnimeById";
import { getPlaylistById } from "../../api/getPlaylistById";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

export default function AnimeDetailsPage({ animeId }) {
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
            {isPlayerSuccess && (
              <AnimePlayer
                animePlayList={animePlaylist}
                animeTitle={animeDetails.title}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  let id = context.query.animeId;

  await queryClient.prefetchQuery(["anime-details", id], () =>
    getAnimeById(id)
  );
  await queryClient.prefetchQuery(["anime-playlist", id], () =>
    getPlaylistById(id)
  );

  return {
    props: {
      animeId: id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
