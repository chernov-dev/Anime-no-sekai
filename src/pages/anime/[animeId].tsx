import Head from "next/head";
import AnimePlayer from "../../components/AnimeComponents/AnimePlayer/AnimePlayer";
import AnimeDetails from "../../components/AnimeComponents/AnimeDetails";
import { getAnimeInfoById } from "../../api/Anime_API/getAnimeInfoById";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import { shimmer, toBase64 } from "../../components/utils/shimmer";
import AnimeRecommendations from "../../components/AnimeComponents/AnimeRecommendations";
import ProtectedWrapper from "../../components/AuthComponents/Protected";

export default function AnimeDetailsPage() {
  const router = useRouter();
  const { animeId } = router.query;

  const {
    data: animeDetails,
    isLoading: isAnimeLoading,
    isSuccess: isAnimeSuccess,
  } = useQuery(["anime-details", animeId], () => getAnimeInfoById(+animeId));

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

        <div className="flex items-center flex-col justify-center">
          {animeDetails.cover && (
            <div className="shadow-neumorphic-inner w-full py-4 mb-2">
              <div className="w-[full] h-[200px] sm:h-[253px] md:h-[283px] lg:h-[339px] xl:h-[389px] relative">
                <Image
                  src={animeDetails.cover}
                  alt="cover of the current anime"
                  layout="fill"
                  placeholder="blur"
                  objectFit="cover"
                  objectPosition="50% 50%"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 300)
                  )}`}
                />
              </div>
            </div>
          )}
          <div className="flex flex-col items-center gap-5 md:mx-0 lg:mx-8 w-full">
            <AnimeDetails anime={animeDetails} />
            {animeDetails.episodes.length > 0 && (
              <div className="anime-player">
                <AnimePlayer
                  episodes={animeDetails.episodes}
                  animeCover={animeDetails.cover}
                />
              </div>
            )}
            <AnimeRecommendations recommendations={animeDetails.recommendations} />
          </div>
        </div>
      </ProtectedWrapper>
    );
  }
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { animeId } = context.query;

  await queryClient.prefetchQuery(["anime-details", animeId], () =>
    getAnimeInfoById(animeId)
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
