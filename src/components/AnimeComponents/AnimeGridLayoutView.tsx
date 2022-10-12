import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import useAddFavorite from "../../hooks/useAddFavorite";
import useFavorites from "../../hooks/useFavorites";
import useRemoveFavorite from "../../hooks/useRemoveFavorite";
import { IAnimeResult } from "../../types/Anime";
import Spinner from "../Shared/Spinner";
import { shimmer, toBase64 } from "../utils/shimmer";
import AnimeCardFooterExtraDetails from "./AnimeCardFooterExtraDetails";
import AnimeExtraDetails from "./AnimeCardFooterExtraDetails";

const Item = ({
  anime,
  children,
  bulletIndex,
  epStatus,
  ratingStatus
}: {
  anime: IAnimeResult;
  children: JSX.Element;
  bulletIndex?: number;
  epStatus? : boolean;
  ratingStatus? : boolean;
}) => {
  let title =
    anime.title.english ?? anime.title.userPreferred ?? anime.title.romaji;
  const router = useRouter();

  let tooltip = `${title} \n Episode ${anime.episodeNumber} - ${anime.episodeTitle}`;
  let imageUrl = anime.image;

  const addFavorite = useAddFavorite(anime.id);
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
            {(bulletIndex || liked) && (
              <div className="anime-status-overlay">
                <div className="h-full px-1 text-4xl font-bold">
                  {bulletIndex}
                </div>
                <div className={`${liked ? "block" : "hidden"} `}>
                  <AiFillLike className={"w-full h-full p-1.5"} />
                </div>
              </div>
            )}
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
          <AnimeCardFooterExtraDetails anime={anime} epStatus={epStatus} ratingStatus={ratingStatus}/>
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
    anime == null || (undefined && <Spinner/>);
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
