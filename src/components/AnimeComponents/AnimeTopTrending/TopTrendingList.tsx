import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { animeApi } from "../../../api/Anime_API";
import PageLoader from "../../Shared/PageLoader";

const TopTrendingList = () => {
  const {
    data: topAiring,
    isLoading: isAiringLoading,
    isSuccess: isAiringSuccess,
  } = useQuery(["anime-airing"], () => animeApi.getTrending({perPage: 9}));

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
        <div className="section-heading pl-2 mb-2">Trending anime</div>
        <div className="neumorphic-list">
          {topAiring.map((anime, index) => {
          
          
            return (
              <div
                key={anime.id}
                className="gap-3 items-center hover:cursor-pointer"
                onClick={() => {
                  location.href = "/anime/" + anime.id
                }}
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
                    {anime.title.userPreferred ?? anime.title.romaji}
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

export default TopTrendingList;
