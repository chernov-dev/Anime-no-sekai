import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoPlayCircleSharp } from "react-icons/io5";
import { EffectFade, Mousewheel, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { animeApi } from "../../../api/Anime_API";
import { formatDate, handleDate } from "../../../utils/handleDate";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/mousewheel";
import "swiper/css/pagination";
import AnsSvgLogo from "../../../../public/AnsSvgLogo";
import { shimmer, toBase64 } from "../../Shared/shimmer";
import AnimeScheduleSkeleton from "./AnimeScheduleSkeleton";

const AnimeSchedule = () => {
  const { data, isLoading, isSuccess, isError } = useQuery(["anime-schedule"], () =>
    animeApi.getAiringSchedule()
  );

  const today = new Date();

  const [currentTime, setCurrentTime] = useState(
    formatDate({ date: today, showSeconds: true })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      let now = new Date();
      setCurrentTime(formatDate({ date: now, showSeconds: true }));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="px-2 my-8">
      <div className="w-full h-fit shadow-neumorphic neumorphic-border rounded-lg">
        <div className="flex flex-col h-[10rem] bg-neumorph-primary dark:bg-neumorph-secondary rounded-lg relative">
          <div className="absolute flex flex-wrap items-center justify-between gap-0 md:gap-2 px-3 rounded-t-lg h-full top-0 left-0 z-30 w-full font-bold bg-black bg-opacity-60 text-white text-opacity-70">
            <span className="text-xl md:text-2xl">
              Estimated Anime schedule{" "}
            </span>
            <span className="text-xl">
              {currentTime}
            </span>
          </div>
          <AnsSvgLogo
            style={{
              width: "100%",
              height: "inherit",
              borderRadius: "inherit",
            }}
            preserveAspectRatio="xMinYMin slice"
            color="black"
            filter="brightness(0.2) sepia(1) hue-rotate(180deg) saturate(5)"
            className="neumorphic-border fill-neumorph-secondary dark:fill-neumorph-primary opacity-60"
          />
        </div>
        <Swiper
          modules={[Pagination, Mousewheel, EffectFade]}
          grabCursor={true}
          slidesPerView={1}
          mousewheel={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          pagination={{ clickable: true }}
          className="mt-4"
        >
          {(isLoading || isError) && <AnimeScheduleSkeleton />}
          {(!isLoading || isSuccess) &&
            data.results.map((anime) => {
              return (
                <SwiperSlide key={anime.id + anime.episode} className="mt-10">
                  <div className="h-full flex flex-col sm:flex-row justify-between p-4 lg:px-8 items-center gap-2 text-sm md:text-base">
                    <Link href={`/anime/${anime.id}`} className="grow relative w-full h-full">
                      <Image
                        src={anime.image}
                        alt={`${anime.title.userPreferred} poster`}
                        fill
                        placeholder="blur"
                        sizes="(max-width: 768px) 50vw,
                  (max-width: 1200px) 70vw"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(320, 70)
                        )}`}
                        className="object-cover object-center rounded-lg filter"
                      />
                    </Link>
                    <div className="m-0 sm:mx-4 flex w-full flex-col flex-wrap justify-center sm:justify-between items-center gap-2 sm:gap-4 text-sm md:text-base">
                      <div className="text-center">
                        <span className="text-base line-clamp-1 font-semibold">
                          {anime.title.userPreferred}
                        </span>
                        <span className="text-sm line-clamp-1">
                          {anime.title.native}
                        </span>
                      </div>
                      <span className="text-black dark:text-white text-opacity-60 dark:text-opacity-60 font-medium">
                        {handleDate(anime.airingAt)}
                      </span>
                      <Link
                        href={`/anime/${anime.id}/#anime-watch`}
                        scroll={false}
                        className="neumorphic-btn secondary gap-2 h-7 text-sm md:text-base"
                      >
                        <IoPlayCircleSharp size={20} />
                        <span> Episode {anime.episode}</span></Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default AnimeSchedule;
