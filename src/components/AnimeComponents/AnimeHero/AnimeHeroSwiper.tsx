import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { IAnimeResult } from "../../../types/Anime";
import Image from "next/image";
import { shimmer, toBase64 } from "../../Shared/shimmer";
import { BsFillDisplayFill, BsPlayCircleFill } from "react-icons/bs";
import { AiFillCalendar, AiFillTag } from "react-icons/ai";
import { VscOpenPreview } from "react-icons/vsc";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { GoWatch } from "react-icons/go";
import { MdWatchLater } from "react-icons/md";
import AnimeHeroExtraInfo from "./AnimeHeroExtraInfo";

const parse = require('html-react-parser');

const AnimeHeroSwiper = ({
  animeList: trending,
}: {
  animeList: IAnimeResult[];
}) => {
  return (
    <div className="mt-6 z-10 lg:p-6 lg:px-5 lg:ml-0 overflow-y-hidden flex items-center justify-center">
      <Swiper
        className=" flex h-full"
        modules={[Autoplay]}
        grabCursor={true}
        slidesPerView={1}
        loop={true}
        autoplay={{delay: 10000}}
      >
        {trending.map((anime) => {
          if (anime.cover.length > 0) {
            return (
              <SwiperSlide
                key={anime.id}
                className="flex flex-col-reverse lg:flex-row gap-5 rounded-2xl p-4"
              >
                <div className="w-full h-full lg:w-[40%] shadow-neumorphic ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10 px-6 py-4 rounded-[inherit] flex flex-col gap-4 justify-center text-neumorph-secondary">
                  <div className="text-center">
                    <h1 className="anime-title text-xl lg:text-3xl truncate">
                      {anime.title.english ?? anime.title.userPreferred}
                    </h1>
                    <div className="anime-subtitle text-base lg:text-xl">
                      {anime.title.native}
                    </div>
                  </div>
                  <AnimeHeroExtraInfo anime={anime} />
                  <div className="grow">
                    <p className="anime-desc line-clamp-3">
                      {parse(anime.description)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      location.href = `/anime/${anime.id}`;
                    }}
                    className="neumorphic-btn secondary flex gap-2"
                  >
                    <BsPlayCircleFill size={20} />
                    Play now
                  </button>
                </div>
                <div className="w-full grow rounded-[inherit]">
                  <div className="h-[15rem] sm:h-[22rem] lg:h-[30rem] relative rounded-[inherit]">
                    <Image
                      src={anime.cover}
                      alt={`${anime.title.english} cover image`}
                      className="rounded-2xl"
                      style={{filter: "brightness(75%) saturate(140%)"}}
                      layout="fill"
                      objectFit="cover"
                      objectPosition={"50% 10%"}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(800, 400)
                      )}`}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  );
};

export default AnimeHeroSwiper;
