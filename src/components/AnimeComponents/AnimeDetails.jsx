import Image from "next/image";
import React from "react";
import ShareOptions from "../Social/ShareOptions";
import { shimmer, toBase64 } from "../utils/shimmer";

const AnimeDetails = ({ animeInfo }) => {
  return (
    <div className="animeCard">
      <div className="animeCard-content w-full">
        <div className="animeCard-header">
          <div>
            <Image
              src={animeInfo.urlImagePreview}
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
            <h4 className="anime-title">{animeInfo.title.split(" / ")[0]}</h4>
            <h4 className="anime-subtitle">
              {animeInfo.title.split(" / ")[1].split("[")[0]}
            </h4>
            <h4 className="anime-info">
              {animeInfo.year +
                ", " +
                (animeInfo.director !== "" ? animeInfo.director : "missing")}
            </h4>
            <div className="anime-genres">
              <p className="anime-type">{animeInfo.type}</p>
              {animeInfo.genre.split(", ").map((genre, index) => (
                <p key={index}>{genre}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="anime-body">
          <p className="anime-desc">{animeInfo.description}</p>
        </div>
        <div className="anime-footer">
          <div className="anime-share">
            <ShareOptions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
