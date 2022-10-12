import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getAnimeTrending } from "../../api/Anime_API/getAnimeTrending";
import PageLoader from "../Shared/PageLoader";

const AnimeTrendingList = () => {
  const { data, isLoading, isSuccess } = useQuery(["anime-trending"], () =>
    getAnimeTrending()
  );

  if (isLoading) {
    return (
      <>
        <PageLoader />
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <div className="neumorphic-list">
          {data.map((anime, index) => {
            return (
              <div
                key={anime.title.english}
                onClick={() => {
                  location.href = `/anime/${anime.id}`;
                }}
                className="cursor-pointer gap-3 items-center"
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
                <div className="flex gap-2 w-full grow justify-end items-center">
                  <p className="text-neumorph-secondary opacity-90 line-clamp-1 mx-2.5 text-ellipsis">
                    {anime.title.english ?? anime.title.userPreferred}
                  </p>
                  <p className="anime-type mr-2">{anime.type}</p>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default AnimeTrendingList;
