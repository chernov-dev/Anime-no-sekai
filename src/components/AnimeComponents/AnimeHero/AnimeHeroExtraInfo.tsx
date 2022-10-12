import React from "react";
import { AiFillCalendar, AiFillTag } from "react-icons/ai";
import { BsPlayCircleFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";

const AnimeHeroExtraInfo = ({anime}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <span className="neumorphic-chip h-8">
        <AiFillTag size={20} />
        {anime.type!}
      </span>
      {anime.totalEpisodes ? (
        <span className="neumorphic-chip h-8">
          <BsPlayCircleFill size={20} />
          {anime.totalEpisodes.toString()} Episode(s)
        </span>
      ) : (
        <span className="neumorphic-chip h-8 text-neumorph-accent">
          <VscOpenPreview size={20} />
          Preview
        </span>
      )}
      {anime.duration && (
        <span className="neumorphic-chip h-8">
          <MdWatchLater size={20} />
          {anime.duration.toString()} min
        </span>
      )}
      {anime.releaseDate && (
        <span className="neumorphic-chip h-8">
          <AiFillCalendar size={20} />
          {anime.releaseDate.toString()}
        </span>
      )}
    </div>
  );
};

export default AnimeHeroExtraInfo;
