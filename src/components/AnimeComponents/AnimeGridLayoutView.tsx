import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import useAddFavorite from "../../hooks/useAddFavorite";
import useFavorites from "../../hooks/useFavorites";
import useRemoveFavorite from "../../hooks/useRemoveFavorite";
import { IAnimeResult } from "../../types/Anime";
import Spinner from "../Shared/Spinner";
import { shimmer, toBase64 } from "../utils/shimmer";
import AnimeCardFooterExtraDetails from "./AnimeCard/AnimeCardFooterExtraDetails";
import AnimeExtraDetails from "./AnimeCard/AnimeCardFooterExtraDetails";

const Item = ({
  anime,
  children,
  bulletIndex,
  epStatus,
  ratingStatus,
}: {
  anime: IAnimeResult;
  children: JSX.Element;
  bulletIndex?: number;
  epStatus?: boolean;
  ratingStatus?: boolean;
}) => {
  let title =
    anime.title.english ?? anime.title.userPreferred ?? anime.title.romaji;
  const router = useRouter();

  let tooltip = `${title}`;
  let imageUrl = anime.image;

  const addFavorite = useAddFavorite(anime.id);
  const removeFavorite = useRemoveFavorite(anime.id);
  const { data: favorites, isLoading: isFavoritesLoading } = useFavorites();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(favorites?.some((e) => e.id === anime.id));
  }, [anime.id, favorites]);

  return (
    <div className="anime-home-item__wrapper" title={tooltip}>
      <div className="anime-home__grid-item">
        <div className="anime-home__grid-item__header">
          <div className="anime-img rounded-bl-none rounded-br-none">
            <div className="anime-status-overlay px-2">
              <div className="h-full px-1 text-4xl font-bold">
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
                  <BsHeartFill
                    size={25}
                    className={
                      "text-neumorph-secondary hover:text-neumorph-accent transition-colors"
                    }
                  />
                </button>
              )}
            </div>
            <Image
              src={imageUrl}
              alt="anime poster"
              height={287}
              width={205}
              layout="responsive"
              className="p-1 filter dark:brightness-[90%]"
              onClick={() => {
                location.href = `/anime/${anime.id}`;
              }}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
          <AnimeCardFooterExtraDetails
            anime={anime}
            epStatus={epStatus}
            ratingStatus={ratingStatus}
          />
        </div>
        <div className="anime-home__grid-item__title py-2 ">
          <p className="line-clamp-2 anime-home__title">{title}</p>
        </div>
      </div>
    </div>
  );
};

const AnimeGridLayoutView = ({
  anime,
  children,
  bullets = false,
  epStatus = true,
  ratingStatus = true,
}: {
  anime: IAnimeResult[];
  children?: JSX.Element;
  bullets?: boolean;
  epStatus?: boolean;
  ratingStatus?: boolean;
}) => {
  {
    anime == null || (undefined && <Spinner />);
  }
  return (
    <div className={`anime-home__grid`}>
      {anime.map((anime: IAnimeResult, index) => (
        <Item
          key={`${anime.id}+${anime.episodeId}`}
          anime={anime}
          bulletIndex={bullets == true ? index + 1 : undefined}
          epStatus={epStatus}
          ratingStatus={ratingStatus}
        >
          {children}
        </Item>
      ))}
    </div>
  );
};

export default AnimeGridLayoutView;
