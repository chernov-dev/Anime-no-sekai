import { BsPlayCircleFill } from "react-icons/bs";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { shimmer, toBase64 } from "../../Shared/shimmer";

// Import Swiper styles
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import { animeApi } from "../../../api/Anime_API";
import AnimeHeroExtraInfo from "./AnimeHeroExtraInfo";
import AnimeHeroSwiperSkeleton from "./AnimeHeroSwiperSkeleton";

const parse = require("html-react-parser");

const AnimeHeroSwiper = () => {
  const {
    data: trendingAnime,
    isLoading: isTrendingLoading,
    isSuccess: isTrendingSuccess,
    isError: isTrendingError,
  } = useQuery(["anime-trending"], () => animeApi.getTrending({ perPage: 9 }));

  return (
    <div className="z-10 lg:p-6 lg:px-5 lg:ml-0 overflow-y-hidden flex items-center justify-center">
      {(isTrendingLoading || isTrendingError) && <AnimeHeroSwiperSkeleton />}
      {(!isTrendingLoading && isTrendingSuccess) && <Swiper
        className="flex h-full"
        modules={[Autoplay]}
        grabCursor={true}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 10000 }}
      >
        {trendingAnime.map((anime) => {
          if (anime.cover.length > 0) {
            return (
              <SwiperSlide
                key={anime.id}
                className="flex flex-col-reverse lg:flex-row gap-5 rounded-2xl p-4"
              >
                <div className="h-auto sm:h-[22rem] lg:h-[30rem] lg:w-[40%] shadow-neumorphic bg-neumorph-primary px-6 py-4 rounded-[inherit] flex flex-col gap-4 justify-center text-primary">
                  <div className="text-center">
                    <h1 className="anime-title text-3xl line-clamp-1">
                      {anime.title.english ?? anime.title.userPreferred}
                    </h1>
                    <div className="anime-subtitle text-xl line-clamp-1">
                      {anime.title.native}
                    </div>
                  </div>
                  <AnimeHeroExtraInfo anime={anime} />
                  <div className="grow flex gap-2 flex-col anime-desc">
                    <p className="line-clamp-3 text-primary text-opacity-70">
                      {parse(anime.description)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      location.href = `/anime/${anime.id}`;
                    }}
                    className="neumorphic-btn primary flex gap-2"
                  >
                    <BsPlayCircleFill size={20} />
                    Play now
                  </button>
                </div>
                <div className="h-[15rem] sm:h-[22rem] lg:h-[30rem] w-full grow rounded-[inherit] relative">
                  <Image
                    src={anime.cover}
                    alt={`${anime.title.english} cover image`}
                    className="object-cover object-center rounded-2xl"
                    style={{ filter: "brightness(75%) saturate(140%)" }}
                    fill={true}
                    sizes={"70vw"}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(900, 400)
                    )}`}
                    priority
                  />
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>}
    </div>
  );
};

export default AnimeHeroSwiper;
