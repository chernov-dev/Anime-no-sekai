import Image from "next/image";
import React from "react";
import Router from "next/router";

import { BsShareFill } from "react-icons/bs";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";

const AnimeComponent = (props) => {
  const { anime } = props;

  return (
    <div
      className="anime-preview-card animate__animated animate__fadeIn"
      style={{
        backgroundImage: `url(https://static.openni.ru/${anime.screenImage[0]})`,
      }}
    >
      <div
        className="anime-preview-card__overlay"
        onClick={() => {
          Router.push(`/anime/${anime.id}`);
        }}
      ></div>
      <div className="anime-preview-card__content">
        <div className="anime-preview-card__header">
          <div className="anime-preview-card__img">
            <Image
              src={anime.urlImagePreview}
              className=""
              alt="preview"
              width="80px"
              height="120px"
              layout="fixed"
            />
          </div>
          <h4 className="anime-preview-card__title">
            {anime.title.split("/")[0]}
          </h4>
          <h4 className="anime-preview-card__info">
            {anime.year}, {anime.director}
          </h4>
          <div className="anime-preview-card__type">
            <p>{anime.type}</p>
            {anime.genre}
          </div>
        </div>
        <div className="anime-preview-card__body">
          <p className="anime-preview-card__desc short">
            {anime.description.split("<br />")[0]}
          </p>
        </div>
        <div className="anime-preview-card__footer">
          <div className="anime-preview-card__share">
            <span onClick={() => console.log("go")}>
              <BsHeartFill />
            </span>
            <span onClick={() => console.log("go")}>
              <BsFillCalendarCheckFill />
            </span>
            <span onClick={() => handleClick()}>
              <BsShareFill />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeComponent;

// <img src={anime.urlImagePreview} className="animePreviewImage"></img>
//       <div className="additionsWrapper">
//         <div>
//           <div>
//             <h6 className="h6">genre</h6>
//             <div className="">
//               {/* {anime.genre.split(",").map((genre_, index) => (
//                 <Badge bg="secondary" className="w-fit me-1" key={index}>
//                   {genre_}
//                 </Badge>
//               ))} */}
//             </div>
//           </div>
//           {anime.director ? (
//             <div>
//               <p className="h6">directed by</p>
//               <Badge bg="secondary" className="">
//                 {anime.director}
//               </Badge>
//             </div>
//           ) : (
//             <div></div>
//           )}
//           <div>
//             <h6 className="h6">type</h6>
//             <Badge bg="secondary" className="">
//               {anime.type}
//             </Badge>
//           </div>
//           <div>
//             <h6 className="h6">{anime.year}</h6>
//           </div>
//         </div>
//       </div>
