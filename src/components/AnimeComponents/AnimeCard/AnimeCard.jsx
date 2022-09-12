import Image from "next/image";
import Router from "next/router";
import { shimmer, toBase64 } from "../../utils/shimmer";

import ShareOptions from "../../Social/ShareOptions";

const AnimeCard = (props) => {
  const { anime } = props;

  return (
    <div
      className="animeCard"
      onClick={(e) => {
        Router.push(`/anime/${anime.id}`);
      }}
    >
      <div className="animeCard-content">
        <div className="animeCard-header">
          <div className="animeCard-img">
            <Image
              src={anime.urlImagePreview}
              alt="preview"
              width="150px"
              height="225px"
              layout="responsive"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
          <div className="animeCard-header__content">
            <h4 className="anime-title">{anime.title.split("/")[0]}</h4>
            <p className="anime-info">
              {anime.year +
                ", " +
                (anime.director !== "" ? anime.director : "missing")}
            </p>
            <div className="anime-genres">
              <p>{anime.type.toLowerCase()}</p>
              {anime.genre.split(", ").map((g, index) => (
                <p key={index}>{g}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="animeCard-body">
          <p className="anime-desc short">
            {anime.description.slice(0, 190)}...
          </p>
        </div>
        <div className="anime-footer">
          <div className="animeCard-share">
            <ShareOptions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
