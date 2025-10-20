import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoPlayCircleSharp } from "react-icons/io5";
import { Autoplay, EffectFade, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { animeApi } from "../../../api/Anime_API";
import { formatDate, handleDate } from "../../../utils/handleDate";

// Import Swiper styles
import { CgTime } from "react-icons/cg";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/mousewheel";
import "swiper/css/navigation";
import { shimmer, toBase64 } from "../../Shared/shimmer";
import AnimeScheduleSkeleton from "./AnimeScheduleSkeleton";

const AnimeSchedule = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["anime-schedule"],
    queryFn: () => animeApi.getAiringSchedule()
  });

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
    <div className="shadow-neumorphic bg-neumorph-primary p-4 rounded-[inherit] flex flex-wrap gap-4">
      <div className="section-heading pl-2 mb-2">Estimated Schedule</div>
      <Swiper
        modules={[Mousewheel, EffectFade, Autoplay, Navigation]}
        grabCursor={true}
        slidesPerView={1}
        mousewheel={true}
        autoplay={{ pauseOnMouseEnter: true, delay: 10000 }}
        navigation={{ enabled: true, prevEl: "swiper-navigation-btn" }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
      >
        {(isLoading || isError) && <AnimeScheduleSkeleton />}
        {(!isLoading || isSuccess) &&
          data.results.map((anime) => {
            return (
              <SwiperSlide key={anime.id + anime.episode}>
                <div className="h-full flex flex-col sm:flex-row justify-between items-center text-sm md:text-base">
                  <Link
                    href={`/anime/${anime.id}`}
                    className="absolute h-full w-full z-0"
                  >
                    <Image
                      src={anime.image}
                      alt={`${anime.title.userPreferred} poster`}
                      fill
                      placeholder="blur"
                      sizes="(max-width: 768px) 50vw,
                  (max-width: 1200px) 70vw"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(120, 190)
                      )}`}
                      className="object-cover object-center rounded-lg filter"
                    />
                  </Link>
                  <div className="py-4 px-2 z-10 flex w-full flex-col flex-wrap justify-center sm:justify-between 
                  items-center gap-2 sm:gap-4 text-base rounded-lg backdrop-blur-sm bg-neumorph-primary bg-opacity-40 dark:backdrop-brightness-50 border-[3px] border-dotted border-primary border-opacity-50">
                    <div className="text-center z-20">
                      <span className="text-base line-clamp-1 font-semibold">
                        {anime.title.userPreferred}
                      </span>
                      <span className="text-sm line-clamp-1 ">
                        {anime.title.native}
                      </span>
                    </div>
                    <span className="text-base font-medium">
                      {handleDate(anime.airingAt)}
                    </span>
                    <Link
                      href={`/anime/${anime.id}/#anime-watch`}
                      scroll={false}
                      className="neumorphic-btn secondary gap-2 h-7 text-sm md:text-base"
                    >
                      <IoPlayCircleSharp size={20} />
                      <span className="whitespace-nowrap"> Episode {anime.episode}</span>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div className="flex justify-between w-full p-2 items-center">
        <p className="text-primary text-base text-opacity-70">Current time</p>
        <div className="neumorphic-chip w-fit">
          <CgTime size={20} className="text-primary text-opacity-50" />
          <p className="text-primary text-opacity-70">{currentTime}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeSchedule;
