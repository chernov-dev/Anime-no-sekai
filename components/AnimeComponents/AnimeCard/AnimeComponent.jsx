import Image from "next/image";
import Router from "next/router";
import { shimmer, toBase64 } from "../../utils/shimmer";

import {
  BsFillCalendarCheckFill,
  BsHeartFill,
  BsShareFill,
} from "react-icons/bs";
import { useRef } from "react";

const AnimeComponent = (props) => {
  const { anime } = props;
  const cardRef = useRef(null);

  return (
    <div
      className="anime-preview-card"
      ref={cardRef}
      // style={{
      //   backgroundImage: `url(https://static.openni.ru/${anime.screenImage[0]})`,
      // }}
      onClick={(e) => {
        Router.push(`/anime/${anime.id}`);
      }}
    >
      <div className="anime-preview-card__overlay">
        <Image
          src={`https://static.openni.ru/${anime.screenImage[0]}`}
          alt="preview"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
          priority
        />
      </div>
      {/* <div className="anime-preview-card__overlay"></div> */}
      <div className="anime-preview-card__wrapper">
        <div className="anime-preview-card__header">
          <div className="anime-preview-card__img">
            <Image
              src={anime.urlImagePreview}
              alt="preview"
              width="150px"
              height="225px"
              layout="fixed"
              priority
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
          <div className="anime-preview-card__header-content">
            <h4 className="anime-preview-card__title">
              {anime.title.split("/")[0]}
            </h4>
            <h4 className="anime-preview-card__info">
              {anime.year}, {anime.director}
            </h4>
            <div className="anime-preview-card__type">
              <p>{anime.type}</p>
              {anime.genre.split(", ").map((g, index) => (
                <p key={index}>{g}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="anime-preview-card__body">
          <p className="anime-preview-card__desc short">
            {anime.description.slice(0, 150)}...
          </p>
        </div>
        <div className="anime-preview-card__footer">
          <div className="anime-preview-card__share">
            <span onClick={(e) => e.stopPropagation()}>
              <BsHeartFill />
            </span>
            <span onClick={(e) => e.stopPropagation()}>
              <BsFillCalendarCheckFill />
            </span>
            <span onClick={(e) => e.stopPropagation()}>
              <BsShareFill />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeComponent;
