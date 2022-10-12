import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { GoPlay } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination } from "swiper";
import { IAnimeResult } from "../../types/Anime";
import ShareOptions from "../Shared/ShareOptions";
import { shimmer, toBase64 } from "../utils/shimmer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Item = ({ anime }: { anime: IAnimeResult }) => {
  const router = useRouter();

  let title =
    anime.title.english ?? anime.title.userPreferred ?? anime.title.romaji;

  return (
    <div className="animeCard flex-shrink-0">
      <div
        className="animeCard-content gap-3"
        onClick={() => {
          router.push(`/anime/${anime.id}`);
        }}
      >
        <div className="animeCard-header flex-col sm:flex-row ">
          <div className="p-3 pb-1 rounded-[1rem] relative h-[20rem] aspect-[2/3]">
            <Image
              src={anime.image}
              className="anime-img"
              alt="preview"
              layout="fill"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(300, 251)
              )}`}
            />
          </div>
          <div className="animeCard-header__content  gap-4 p-0 md:px-3 pb-0">
            <div className="flex flex-col w-full shadow-neumorphic rounded-xl ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10 p-2">
              <h1 className="text-xl mb-1">{title}</h1>
              <p className="anime-subtitle">{anime.title?.native}</p>
            </div>
            <div className="grow h-full flex flex-col justify-end text-neumorph-secondary shadow-neumorphic-inner ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5 overflow-hidden rounded-xl p-4 font-semibold w-full gap-2 bg-neumorph-primary">
              <div className="">
                <span className="flex gap-2">
                  Episode:
                  <span className="text-neumorph-accent">
                    {anime.episodeNumber &&
                      `
                      ${anime.episodeNumber.toString()} 
                      (${anime.episodeTitle.toString()})`}
                  </span>
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
              <div className="shadow-neumorphic-inner py-2 px-3 rounded-xl ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-5">
                <div className="skewed-text flex-row flex-wrap h-fit">
                  <div className="flex gap-1 h-8 w-fit bg-neumorph-primary-dark">
                    <span className="">Genres</span>
                  </div>
                  {anime.genres?.map((genre, index) => (
                    <div
                      className="flex gap-1 h-8 w-fit bg-neumorph-primary-dark "
                      key={index}
                    >
                      <span className="text-neumorph-secondary">{genre}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* {anime.episodeNumber && (
                  <div className="ep-status">
                    <span className="flex items-center gap-1 ">
                      {anime.episodeNumber} <GoPlay size={15} />
                    </span>
                  </div>
                )}
                {anime.rating && (
                  <div className="rating-status">
                    <span className="flex items-center gap-1 ">
                      {anime.rating} <AiFillStar size={15} />
                    </span>
                  </div>
                )} */}
          </div>
        </div>
        <div className="anime-footer">
          <div className="animeCard-share">
            <ShareOptions anime={anime} />
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
        modules={[Pagination, A11y]}
        pagination={{ clickable: true}}
        slidesPerView={1}
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
