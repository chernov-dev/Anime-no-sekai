import Image from "next/image";
import React from "react";
import { IAnime } from "../../types/Anime";
import ShareOptions from "../Social/ShareOptions";
import { shimmer, toBase64 } from "../utils/shimmer";

const AnimeDetails = ({ anime } : { anime : IAnime}) => {
  const validImgSrcUrl = `${anime.images.jpg.large_image_url ?? anime.images.webp.large_image_url}`;

  return (
    <div className="animeCard">
      <div className="animeCard-content w-full">
        <div className="animeCard-header">
          <div>
            <Image
              src={validImgSrcUrl}
              className="anime-img"
              alt="preview"
              height="394px"
              width="300px"
              layout="fixed"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(394, 300)
              )}`}
              priority
            />
          </div>
          <div className="animeCard-header__content">
            <h4 className="anime-title">{anime.titles.en}</h4>
            <h4 className="anime-subtitle">{anime.titles.ja}</h4>
            <h4 className="anime-info">
              {anime.year}
            </h4>
            <div className="anime-genres">
              <p className="anime-type">{anime.type}</p>
              {anime.genres.map((genre, index) => (
                <p key={index}>{genre.name}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="anime-body">
          <p className="anime-desc">{anime.synopsis!}</p>
        </div>
        <div className="anime-footer">
          <div className="animeCard-share">
            <ShareOptions anime={anime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
