import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { getAnimeTopAiring } from "../../../api/Anime_API/getAnimeTopAiring";
import { shimmer, toBase64 } from "../../Shared/shimmer";

const TopTrendingList = () => {
  const {
    data: topAiring,
    isLoading: isAiringLoading,
    isSuccess: isAiringSuccess,
  } = useQuery({ queryKey: ["anime-airing"], queryFn: () => getAnimeTopAiring() });

  let airingList = [...Array(9)];

  if (isAiringSuccess) {
    airingList = topAiring;
  }

  return (
    <div className="shadow-neumorphic bg-neumorph-primary p-4 rounded-[inherit] gap-2 flex flex-col">
      <div className="section-heading pl-2 mb-4">Trending anime</div>
      <div className="neumorphic-list">
        {airingList.map((anime, index) => {
          return (
            <Link
              key={anime?.title.userPreferred ?? index}
              href={`/anime/${anime?.id}`}
              className="gap-3 items-center hover:cursor-pointer"
            >
              <div className="flex flex-col gap-2 w-full grow justify-end items-center px-2 md:px-6">
                <p className="text-primary opacity-90 line-clamp-1">
                  {(anime?.title.userPreferred ?? anime?.title.romaji) ?? <Skeleton width='10rem' height="2rem" />}
                </p>
              </div>
              <div className="hidden sm:block relative h-[5rem] w-full">
                {anime?.image ? <Image
                  src={anime?.image}
                  style={{ flexGrow: 1 }}
                  alt="top anime"
                  fill
                  sizes="(max-width: 768px) 50vw,
                  (max-width: 1200px) 35vw,
                  20vw"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(160, 70)
                  )}`}
                  className="object-cover object-center rounded-2xl"
                /> : <Skeleton height={"100%"} style={{ lineHeight: "inherit" }} />}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TopTrendingList;
