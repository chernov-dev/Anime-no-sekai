import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { animeApi } from "../../../api/Anime_API";
import PageLoader from "../../Shared/PageLoader";
import { shimmer, toBase64 } from "../../Shared/shimmer";

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
              <Link
                key={anime.id}
                href={`/anime/${anime.id}`}
                className="gap-3 items-center hover:cursor-pointer"
              >
                <div className="flex flex-col gap-2 w-full grow justify-end items-center px-2 md:px-6">
                  <p className="text-neumorph-secondary opacity-90 line-clamp-1">
                    {anime.title.userPreferred ?? anime.title.romaji}
                  </p>
                </div>
                <div className="hidden sm:block relative h-[5rem] w-full">
                  <Image
                    src={anime.image}
                    style={{ flexGrow: 1 }}
                    alt="top anime"
                    fill
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(160, 70)
                    )}`}
                    className="object-cover object-center rounded-2xl"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
};

export default TopTrendingList;
