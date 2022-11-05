import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { A11y, Mousewheel, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IAnimeResult } from "../../../../types/Anime";
import ShareOptions from "../../../Shared/ShareOptions";
import { shimmer, toBase64 } from "../../../Shared/shimmer";

// Import Swiper styles
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "swiper/css";
import "swiper/css/mousewheel";
import "swiper/css/pagination";

const Item = ({ anime }: { anime: IAnimeResult | undefined }) => {
  const router = useRouter();

  let title =
    anime?.title.english ?? anime?.title.userPreferred ?? anime?.title.romaji;


  return (
    <div className="animeCard flex-shrink-0 pt-8">
      <Link
        className="animeCard-content p-2 gap-3"
        href={`/anime/${anime?.id}`}
      >
        <div className="animeCard-header h-full flex-col sm:flex-row">
          <div className="p-3 pb-1 rounded-[1rem] relative h-[15rem] sm:h-[30rem] w-full">
            {anime?.image == undefined || null ? <Skeleton height={"100%"} style={{ lineHeight: "inherit", borderRadius: "inherit" }} /> : <Image
              src={anime?.image}
              alt="preview"
              fill
              sizes="50vw"
              className="object-cover object-top sm:object-center rounded-2xl"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(300, 251)
              )}`}
            />}
          </div>
          <div className="animeCard-header__content gap-3 p-0 md:px-3 pb-0">
            <div className="flex flex-col w-full shadow-neumorphic rounded-xl border-[1px] border-black dark:border-white border-opacity-10 dark:border-opacity-10 p-2">
              <h1 className="anime-home__title mb-1">{title || <Skeleton width={"10rem"} />}</h1>
              <p className="anime-subtitle text-center">{anime?.title?.native || <Skeleton width={"8rem"} />}</p>
            </div>
            <div className="h-full flex flex-col text-primary shadow-neumorphic-inner text-sm border-[1px] border-black dark:border-white border-opacity-5 dark:border-opacity-5 rounded-xl p-4 font-semibold w-full gap-2 bg-neumorph-primary">
              {anime?.description && (
                <div className="h-40 text-ellipsis overflow-hidden">
                  {anime?.description}
                </div>
              )}
              <div className="flex gap-2">
                {anime?.episodeNumber && (
                  <span className="whitespace-nowrap">
                    Episode {anime?.episodeNumber.toString()}:
                  </span>
                )}
                {anime?.episodeTitle && (
                  <span className="line-clamp-1 text-neumorph-accent whitespace-nowrap">
                    {anime?.episodeTitle.toString()}
                  </span>
                )}
              </div>
              <div className="flex font-semibold">Type: {anime?.type}</div>
              {anime?.rating && (
                <div className="flex gap-1">
                  Rating:{" "}
                  <span className="text-neumorph-accent flex items-center gap-1">
                    {anime?.rating / 10} <AiFillStar />
                  </span>
                </div>
              )}
              <div className="skewed-text ml-1 opacity-100 flex-row flex-wrap h-fit">
                <div className="flex bg-neumorph-primary-darkneumorphic-genre mr-1">
                  <span className="text-xs lg:text-sm">Genres</span>
                </div>
                {anime?.genres?.map((genre, index) => (
                  <div
                    className="flex bg-neumorph-primary-dark neumorphic-genre"
                    key={index}
                  >
                    <span className="text-primary">{genre}</span>
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
      </Link>
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
        {anime?.map((anime) => {
          return (
            <SwiperSlide key={anime?.id}>
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
