import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoPlayCircleSharp } from "react-icons/io5";
import AnsSvgLogo from "../../../../public/AnsSvgLogo";
import { animeApi } from "../../../api/Anime_API";
import { formatDate, handleDate } from "../../../utils/handleDate";
import Spinner from "../../Shared/Spinner";

const AnimeSchedule = () => {
  const { data, isLoading, isSuccess } = useQuery(["anime-schedule"], () =>
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
    <div className="px-2">
      <div className="w-full h-fit shadow-neumorphic neumorphic-border rounded-lg">
        <div className="text-lg lg:text-xl">
          <div className="flex flex-wrap items-center gap-0 md:gap-2 bg-neumorph-primary shadow-neumorphic-inner rounded-t-lg px-4 p-3 relative">
            <span className="text-xl">Estimated Anime schedule </span>
            <span className="text-opacity-60">- Now: {currentTime}</span>
          </div>
        </div>
        <div className="flex flex-col h-[15rem] bg-neumorph-primary dark:bg-neumorph-accent mx-2">
          <AnsSvgLogo
            style={{
              width: "100%",
              height: "inherit",
            }}
            preserveAspectRatio="xMinYMin slice"
            color="black"
            className="neumorphic-border fill-neumorph-accent dark:fill-neumorph-primary "
          />
        </div>
        <ul className="flex flex-col">
          {isLoading && <Spinner />}
          {isSuccess &&
            data.results.map((anime) => {
              return (
                <li
                  key={anime.id + anime.episode}
                  className="neumorphic-border border-t-0 border-l-0 border-r-0 border-b-[1px]"
                >
                  <div
                    onClick={() => (location.href = `/anime/${anime.id}`)}
                    className="h-full flex flex-col sm:flex-row justify-between p-4 lg:px-8 items-center gap-2 text-sm md:text-base transition-colors hover:bg-neumorph-primary-light"
                  >
                    <div className="m-0 sm:mx-4 grow w-full flex flex-row flex-wrap justify-center sm:justify-between items-center gap-2 sm:gap-4 text-sm md:text-base">
                      <span className=" text-base line-clamp-1">
                        {anime.title.userPreferred} / {anime.title.native}
                      </span>
                      <span className="text-black dark:text-white text-opacity-60 dark:text-opacity-60 font-medium">
                        {handleDate(anime.airingAt)}
                      </span>
                    </div>
                    <Link
                      href={`/anime/${anime.id}/#anime-watch`}
                      scroll={false}
                    >
                      <a className="neumorphic-btn secondary gap-2 w-full sm:w-[13rem] h-7 text-sm md:text-base">
                        <IoPlayCircleSharp size={20} />
                        <span> Episode {anime.episode}</span>
                      </a>
                    </Link>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default AnimeSchedule;
