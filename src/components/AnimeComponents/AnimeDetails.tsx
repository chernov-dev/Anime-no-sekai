import Image from "next/image";
import React from "react";
import ShareOptions from "../Shared/ShareOptions";
import { shimmer, toBase64 } from "../utils/shimmer";

const handleDate = (nextAiringEpisodeTime: number) => {
  // convert unix time to date and time
  if (nextAiringEpisodeTime === undefined) {
    return;
  }
  const date = new Date(nextAiringEpisodeTime * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  return (
    day + "/" + month + "/" + year + " " + hours + ":" + minutes.substr(-2)
  );
};

const parse = require("html-react-parser");

const AnimeDetails = ({ anime }) => {
  // const validImgSrcUrl = `${
  //   anime.images.jpg.large_image_url ?? anime.images.webp.large_image_url
  // }`;

  const nextEpisode = handleDate(anime.nextAiringEpisode?.airingTime);

  return (
    <div className="animeCard w-[90%]">
      <div className="animeCard-content w-full">
        <div className="animeCard-header">
          <div className="anime-img">
            <Image
              src={anime.image}
              style={{ borderRadius: "inherit" }}
              alt="preview"
              height="394px"
              width="300px"
              layout="intrinsic"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(394, 300)
              )}`}
            />
          </div>
          <div className="animeCard-header__content">
            <div className="flex flex-col justify-between gap-1">
              <div className="anime-title text-xl lg:text-2xl">
                {anime.title.english}
              </div>
              <div className="anime-subtitle font-medium">
                {anime.title.native}
              </div>
            </div>
            <div className="anime-type">
              <p className=" text-neumorph-accent">Type: {anime.type}</p>
            </div>
            <div className="anime-genres">
              {anime.genres.map((genre, index) => (
                <div className="neumorphic-chip" key={index}>
                  <p className="">{genre}</p>
                </div>
              ))}
            </div>
            <div className="grow"></div>
            <div className="text-neumorph-secondary">
              {anime.studios.length == 1 ? "Studio:" : "Studios:"}{" "}
              {anime.studios}
            </div>
            <div className="shadow-neumorphic p-3 rounded-xl text-neumorph-secondary ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10">
              <div>Status: {anime.status}</div>
              <div className="">
                <p>Release date: {anime.startDate.year}</p>
              </div>
              <div className="">
                <p>
                  Episodes: {anime.episodes.length}/{anime.totalEpisodes}
                </p>
              </div>
              {nextEpisode && <div>Next episode: {nextEpisode}</div>}
            </div>
          </div>
        </div>
        {anime.description && (
          <div className="anime-body rounded-xl shadow-neumorphic-inner ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5">
            <p className="anime-desc p-5">{parse(anime.description)}</p>
          </div>
        )}
        <div className="anime-footer mt-4">
          <div className="animeCard-share">
            <ShareOptions anime={anime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
