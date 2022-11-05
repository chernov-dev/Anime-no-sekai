import Image from "next/image";
import Link from "next/link";
import { shimmer, toBase64 } from "../../Shared/shimmer";

const AnimeRecommendedList = ({ anime }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="anime-home__header mt-4 px-1 flex justify-between">
        <p className="text-base md:text-xl">Recommended based on your anime</p>
      </div>
      <div className="neumorphic-list">
        {anime.map((anime, index) => {
          return (
            <Link
              key={anime.title.english}
              href={`/anime/${anime.id}`}
              className="cursor-pointer"
            >
              <Image
                src={anime.image}
                style={{ flexGrow: 1 }}
                width={60}
                height={78}
                alt="top anime"
                placeholder="blur"
                sizes="(max-width: 768px) 33vw,
                  (max-width: 1200px) 25vw,
                  20vw"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(60, 78)
                )}`}
              />
              <p className="text-primary opacity-90 short mx-2.5 grow">
                {anime.title.english ?? anime.title.userPreferred}
              </p>
              <p className="anime-type mr-2">{anime.type}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AnimeRecommendedList;
