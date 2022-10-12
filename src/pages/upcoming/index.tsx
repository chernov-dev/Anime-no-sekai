import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiFillLike } from "react-icons/ai";
import { animeApi } from "../../api/Anime_API";
import { getUpcomingAnimes } from "../../api/Anime_API/getUpcomingAnimes";
import AnimeCardFooterExtraDetails from "../../components/AnimeComponents/AnimeCardFooterExtraDetails";
import AnimeGridLayoutView from "../../components/AnimeComponents/AnimeGridLayoutView";
import AnimeHome from "../../components/AnimeComponents/AnimeHome";
import ProtectedWrapper from "../../components/AuthComponents/Protected";
import PageLoader from "../../components/Shared/PageLoader";
import Spinner from "../../components/Shared/Spinner";
import { shimmer, toBase64 } from "../../components/utils/shimmer";
import useAddFavorite from "../../hooks/useAddFavorite";
import useFavorites from "../../hooks/useFavorites";
import { IAnimeResult } from "../../types/Anime";

const UpcomingAnimeCardFooter = ({type,popularity}) => {
  return (
    <div className="text-neumorph-primary px-2 py-1.5 font-semibold items-center rounded-tl-none rounded-tr-none flex w-full h-full gap-2 justify-between bg-neumorph-primary-dark">
      <p className="text-neumorph-secondary font-bold text-sm lg:text-base">
        Popularity - {popularity}
      </p>
      <p className="text-neumorph-secondary font-bold text-sm lg:text-base">
        {type}
      </p>
    </div>
  );
};

const Item = ({ anime }: { anime: any }) => {
  let title = anime.title;
  const router = useRouter();

  let tooltip = `${title} \n Episode ${anime.episodeNumber} - ${anime.episodeTitle}`;
  let imageUrl = anime.image ?? anime.images.jpg.image_url;

  const addFavorite = useAddFavorite(anime.id);
  const { data: favorites, isLoading: isFavoritesLoading } = useFavorites();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(favorites?.some((e) => e.id === anime.id));
  }, [anime.id, favorites]);

  return (
    <div className="anime-home-item__wrapper" title={tooltip}>
      <div className="anime-home__grid-item">
        <div className="anime-home__grid-item__header">
          <div className="anime-img rounded-bl-none rounded-br-none">
            {liked && (
              <div className="anime-status-overlay">
                <div className={`${liked ? "block" : "hidden"} `}>
                  <AiFillLike className={"w-full h-full p-1.5"} />
                </div>
              </div>  
            )}
            <Image
              src={imageUrl}
              alt="anime poster"
              height={450}
              width={345}
              layout="responsive"
              className="p-1 filter dark:brightness-[90%]"
              onClick={() => {
                location.href = `${anime.trailer.url.toString()}`;
              }}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
        <UpcomingAnimeCardFooter type={anime.type} popularity={anime.popularity}/>
        </div>
        <div className="anime-home__grid-item__title py-2 ">
          <p className="line-clamp-2 leading-[1.1] text-neumorph-secondary">
            {title}
          </p>
          <p className="text-neumorph-secondary">
            {anime.year && <span>Year - {anime.year}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

const UpcomingAnimesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isSuccess } = useQuery(["anime-upcoming"], () =>
    animeApi.getUpcomingAnimes()
  );

  if (isLoading) {
    return <PageLoader />;
  }

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  return (
    <ProtectedWrapper>
      <Head>
        <title>ANS - Top</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col max-w-[1000px] items-center">
          <p className="text-xl md:text-2xl text-neumorph-secondary py-1">
            Upcoming
          </p>
          <div className={`anime-home__grid`}>
            {isLoading && <Spinner />}
            {data &&
              data.data.map((anime: IAnimeResult, index) => (
                <Item key={`${anime.mal_id}`} anime={anime} />
              ))}
          </div>
          {/* <AnimeGridLayoutView
            anime={upcomingAnime.data}
            ratingStatus={false}
            epStatus={false}
          /> */}
        </div>
      </main>
    </ProtectedWrapper>
  );
};

// export const getStaticProps = async () => {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["anime-upcoming"], () =>
//     getUpcomingAnimes()
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default UpcomingAnimesPage;
