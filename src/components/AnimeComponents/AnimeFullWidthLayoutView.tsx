import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { GoPlay } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Mousewheel, Pagination } from "swiper";
import { IAnimeResult } from "../../types/Anime";
import ShareOptions from "../Shared/ShareOptions";
import { shimmer, toBase64 } from "../utils/shimmer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

const Item = ({ anime }: { anime: IAnimeResult }) => {
  const router = useRouter();

  let title =
    anime.title.english ?? anime.title.userPreferred ?? anime.title.romaji;

  return (
    <div className="animeCard flex-shrink-0 pt-8">
      <div
        className="animeCard-content p-2 gap-3 "
        onClick={() => {
          router.push(`/anime/${anime.id}`);
        }}
      >
        <div className="animeCard-header h-[60vh] flex-col sm:flex-row ">
          <div className="p-3 pb-1 rounded-[1rem] relative h-full aspect-[2/3]">
            <Image
              src={anime.image}
              className="anime-img"
              alt="preview"
              layout="fill"
              objectFit="cover"
              objectPosition={"50% 20%"}
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(300, 251)
              )}`}
            />
          </div>
          <div className="animeCard-header__content gap-3 p-0 md:px-3 pb-0">
            <div className="flex flex-col w-full shadow-neumorphic rounded-xl border-[1px] border-black dark:border-white border-opacity-10 dark:border-opacity-10 p-2">
              <h1 className="anime-home__title mb-1">{title}</h1>
              <p className="anime-subtitle">{anime.title?.native}</p>
            </div>
            <div className="h-full flex flex-col justify-end text-neumorph-secondary shadow-neumorphic-inner text-sm  border-[1px] border-black dark:border-white border-opacity-5 dark:border-opacity-5 overflow-hidden rounded-xl p-4 font-semibold w-full gap-2 bg-neumorph-primary">
              <div className="flex gap-2">
                <span className="whitespace-nowrap">
                  Episode {anime.episodeNumber.toString()}:
                </span>
                <span className="line-clamp-1 text-neumorph-accent whitespace-nowrap">
                  {anime.episodeTitle.toString()}
                </span>
              </div>
              <div className="flex font-semibold">Type: {anime.type}</div>
              {anime.rating && (
                <div className="flex gap-1">
                  Rating:{" "}
                  <span className="text-neumorph-accent">
                    {anime.rating?.toString()}
                  </span>
                </div>
              )}
              <div className="skewed-text opacity-100 flex-row flex-wrap h-fit">
                <div className="flex ml-2 neumorphic-genre">
                  <span className="">Genres</span>
                </div>
                {anime.genres?.map((genre, index) => (
                  <div
                    className="flex bg-neumorph-primary-dark neumorphic-genre"
                    key={index}
                  >
                    <span className="text-neumorph-secondary">{genre}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="anime-footer grow">
              <div className="animeCard-share h-10">
                <ShareOptions anime={anime} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimeFullWidthLayoutView = ({
  anime,
  children,
}: {
  anime: IAnimeResult[];
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex relative mb-3">
      <Swiper
        modules={[Pagination, A11y, Mousewheel]}
        pagination={{ clickable: true }}
        mousewheel={true}
        slidesPerView={1}
        grabCursor={true}
        loop={true}
      >
        {anime.map((anime) => {
          return (
            <SwiperSlide key={anime.id}>
              <Item anime={anime}></Item>
            </SwiperSlide>
          );
        })}
        {children}
      </Swiper>
    </div>
  );
};

export default AnimeFullWidthLayoutView;
