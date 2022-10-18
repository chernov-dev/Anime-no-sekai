import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getAnimeTrending } from "../../api/Anime_API/getAnimeTrending";
import PageLoader from "../Shared/PageLoader";
import { getAnimeTopAiring } from "../../api/Anime_API/getAnimeTopAiring";

const TopAiringList = () => {
  const {
    data: topAiring,
    isLoading: isAiringLoading,
    isSuccess: isAiringSuccess,
  } = useQuery(["anime-airing"], () => getAnimeTopAiring());

  if (isAiringLoading) {
    return (
      <>
        <PageLoader />
      </>
    );
  }

  if (isAiringSuccess) {
    return (
      <div className="flex flex-col">
        <div className="section-heading pl-2 mb-2">Top airing anime</div>
        <div className="neumorphic-list">
          {topAiring.map((anime, index) => {
            return (
              <div
                key={anime.title.english}
                className="gap-3 items-center"
              >
                <div className="hidden sm:block relative w-[400px] h-full">
                  <Image
                    src={anime.image}
                    style={{ flexGrow: 1 }}
                    alt="top anime"
                    width={"160px"}
                    height={"70px"}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition={"50% 30%"}
                    className="rounded-2xl"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full grow justify-end items-center px-2 md:px-6">
                  <p className="text-neumorph-secondary opacity-90 line-clamp-1">
                    {anime.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default TopAiringList;
