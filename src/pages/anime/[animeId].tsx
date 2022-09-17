import Head from "next/head";
import AnimePlayer from "../../components/AnimeComponents/AnimePlayer/AnimePlayer";
import AnimeDetails from "../../components/AnimeComponents/AnimeDetails";
import { getAnimeById } from "../../api/getAnimeById";
import { getPlaylistById } from "../../api/getPlaylistById";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { IAnime } from "../../types/Anime";

export default function AnimeDetailsPage() {
  const router = useRouter();
  const { animeId } = router.query;

  const {
    data: animeDetails,
    isLoading: isAnimeLoading,
    isSuccess: isAnimeSuccess,
  } = useQuery(["anime-details", animeId], () => getAnimeById(+animeId));

  let details = animeDetails as IAnime;

  // const {
  //   data: animePlaylist,
  //   isLoading: isPlayerLoading,
  //   isSuccess: isPlayerSuccess,
  // } = useQuery(["anime-playlist", animeId], () => getPlaylistById(animeId));

  if (isAnimeSuccess && details) {
    return (
      <>
        <Head>
          <title>ANS - {details.titles.en}</title>
          <meta name="description " content={`ANS - ${details.titles.en}`} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="section-header">
            <h1 className="title">{details.titles.en}</h1>
          </div>
          <div className="animeList">
            <AnimeDetails anime={details} />
            {/* <div className="anime-player">
              {isPlayerLoading && (
                <div className="text-center w-full text-slate-400">
                  Loading player
                </div>
              )}
              <AnimePlayer
                animePlayList={animePlaylist}
                animeTitle={animeDetails.title}
              />
            </div> */}
          </div>
        </main>
      </>
    );
  }
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { animeId } = context.query;

  await queryClient.prefetchQuery(["anime-details", animeId], () =>
    getAnimeById(animeId)
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
