import { AiFillCalendar, AiFillTag } from "react-icons/ai";
import { BsPlayCircleFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";

const AnimeHeroExtraInfo = ({ anime }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <span className="neumorphic-chip text-primary text-opacity-60">
        <AiFillTag size={20} />
        {anime?.type}
      </span>
      {anime.totalEpisodes ? (
        <span className="neumorphic-chip text-primary text-opacity-60">
          <BsPlayCircleFill size={20} />
          {anime?.totalEpisodes} Episode(s)
        </span>
      ) : (
        <span className="neumorphic-chip text-opacity-60 text-neumorph-accent">
          <VscOpenPreview size={20} />
          Preview
        </span>
      )}
      {anime.duration && (
        <span className="neumorphic-chip text-primary text-opacity-60">
          <MdWatchLater size={20} />
          {anime?.duration} min
        </span>
      )}
      {anime.releaseDate && (
        <span className="neumorphic-chip text-primary text-opacity-60">
          <AiFillCalendar size={20} />
          {anime?.releaseDate}
        </span>
      )}
    </div>
  );
};

export default AnimeHeroExtraInfo;
