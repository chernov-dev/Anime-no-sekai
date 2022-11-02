import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import {
  useUserPreferences
} from "../../../../context/UserPreferencesProvider";
import useAddFavorite from "../../../../hooks/useAddFavorite";
import useRemoveFavorite from "../../../../hooks/useRemoveFavorite";
import { IAnimeResult } from "../../../../types/Anime";
import { shimmer, toBase64 } from "../../../Shared/shimmer";
import AnimeCardFooterExtraDetails from "../../AnimeCard/AnimeCardFooterExtraDetails";

const Item = ({
  anime,
  children,
  bulletIndex,
}: {
  anime: IAnimeResult | undefined;
  children: JSX.Element;
  bulletIndex?: number;
}) => {

  const router = useRouter();

  let title =
    (anime?.title.english ?? anime?.title.userPreferred ?? anime?.title.romaji) ?? null;

  let tooltip = `${title}` ?? null;
  let imageUrl = anime?.image ?? null;

  const { favoriteIds } = useUserPreferences();
  const addFavorite = useAddFavorite(anime?.id);
  const removeFavorite = useRemoveFavorite(anime?.id);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(favoriteIds?.some((e) => e == +anime?.id));
  }, [anime?.id, favoriteIds]);

  return (
    <>
      <Link
        className="anime-home-item__wrapper"
        title={tooltip}
        href={anime?.id ? `/anime/${anime!.id}` : ""}
      >
        <div className="anime-home__grid-item">
          <div className="anime-home__grid-item__header">
            <div className="anime-img">
              <div className="anime-status-overlay px-2">
                <div className="h-full px-1 text-4xl font-bold text-neumorph-primary">
                  {bulletIndex}
                </div>
                {liked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite.mutate();
                    }}
                  >
                    <BsHeartFill
                      size={25}
                      className={
                        "hover:text-neumorph-secondary transition-colors"
                      }
                    />
                  </button>
                )}
                {!liked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addFavorite.mutate();
                    }}
                  >
                    {anime?.id ? <BsHeartFill
                      size={25}
                      className={
                        "text-neumorph-primary hover:text-neumorph-accent transition-colors"
                      }
                    /> : <Skeleton circle width={"2rem"} height={"2rem"} style={{ lineHeight: "inherit" }} />}
                  </button>
                )}
              </div>
              {imageUrl == undefined || null ? <Skeleton height={"82%"} style={{ lineHeight: "inherit", borderRadius: "inherit" }} /> :
                <Image
                  src={imageUrl}
                  alt="anime poster"
                  fill
                  sizes="(max-width: 768px) 33vw,
                  (max-width: 1200px) 25vw,
                  20vw"
                  className="filter dark:brightness-[90%] rounded-[inherit]"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(300, 205)
                  )}`}
                />}
            </div>
            <AnimeCardFooterExtraDetails
              anime={anime}
            />
          </div>
          <div className="anime-home__grid-item__title py-2 ">
            <p className="line-clamp-2 anime-home__title">
              {title ?? <Skeleton width={"80%"} />}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

const AnimeGridLayoutView = ({
  anime,
  children,
  bullets = false,
}: {
  anime: IAnimeResult[] | undefined | null;
  children?: JSX.Element;
  bullets?: boolean;
}) => {

  {
    if (anime == (undefined || null)) {
      anime = [...Array(4)];
    }
  }

  return (
    <div className={`anime-home__grid`}>
      {anime.map((anime: IAnimeResult, index) => (
        <Item
          key={`${index}`}
          anime={anime}
          bulletIndex={bullets == true ? index + 1 : undefined}
        >
          {children}
        </Item>
      ))}
    </div>
  );
};

export default AnimeGridLayoutView;
