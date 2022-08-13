import Image from "next/image";
import React from "react";
import {
  BsFillCalendarCheckFill,
  BsHeartFill,
  BsShareFill,
} from "react-icons/bs";

const AnimeInfo = ({ animeInfo }) => {
  return (
    <div className="animeCard">
      <div className="animeCard-content">
        <div className="animeCard-header">
          <div>
            <Image
              src={animeInfo.img.src}
              className="anime-img"
              alt="preview"
              height="394px"
              width="300px"
              layout="fixed"
            />
          </div>
          <div className="animeCard-header__content">
            <h4 className="anime-title">{animeInfo.title.ru}</h4>
            <h4 className="anime-subtitle">{animeInfo.title.en}</h4>
            <h4 className="anime-info">
              {animeInfo.extra.year}, {animeInfo.extra.director}
            </h4>
            <div className="anime-type">
              <p>{animeInfo.extra.type}</p>
              {animeInfo.extra.genres.split(", ").map((genre, index) => (
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
            <span onClick={() => console.log("go")}>
              <BsHeartFill />
            </span>
            <span onClick={() => console.log("go")}>
              <BsFillCalendarCheckFill />
            </span>
            <span onClick={() => console.log("go")}>
              <BsShareFill />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfo;
