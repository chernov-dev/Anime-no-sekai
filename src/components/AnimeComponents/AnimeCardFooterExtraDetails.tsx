import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsCloud, BsCloudsFill, BsFillDisplayFill } from "react-icons/bs";
import { GoPlay } from "react-icons/go";
import {
  MdCloudDone,
  MdDoneAll,
  MdOutlineCloudDone,
  MdOutlineDone,
} from "react-icons/md";
import { IAnimeResult } from "../../types/Anime";

const CompletedTag = ({ totalEpisodes }) => {
  return (
    <>
      {totalEpisodes && (
        <div className="ep-status">
          <span className="flex items-center gap-1 text-xs md:text-md">
            <p className="whitespace-pre">{totalEpisodes}</p>
            <BsCloudsFill size={19} />
          </span>
        </div>
      )}
    </>
  );
};
const EpisodeStatusTag = ({ episodeNumber }) => {
  return (
    <div className="ep-status">
      <span className="flex items-center gap-1 text-xs md:text-sm">
        <p className="whitespace-pre">EP {episodeNumber}</p>
        <GoPlay size={15} />
      </span>
    </div>
  );
};
const RatingTag = ({ rating }) => {
  return (
    <>
      {rating && (
        <div className="rating-status">
          <span className="flex items-center gap-1 text-xs md:text-sm">
            {rating / 10} <AiFillStar size={15} />
          </span>
        </div>
      )}
    </>
  );
};
const AnimeCardFooterExtraDetails = ({
  anime,
  epStatus = true,
  ratingStatus = true,
}: {
  anime: IAnimeResult;
  epStatus?: boolean;
  ratingStatus?: boolean;
}) => {
  const episodeNumber =
    anime.episodeNumber ??
    anime.totalEpisodes ??
    (Array.isArray(anime.episodes)
      ? anime.episodes.length
      : anime.episodes ?? 0);

  return (
    <div className="text-neumorph-primary px-2 py-1.5 font-semibold items-center rounded-tl-none rounded-tr-none flex w-full h-full gap-2 justify-between bg-neumorph-primary-dark">
      <div className="skewed-text pl-1">
        {epStatus && (
          <>
            {anime.status == "Completed" && (
              <CompletedTag totalEpisodes={anime.totalEpisodes} />
            )}
            {(anime.status == "Ongoing" || anime.status == undefined) && (
              <EpisodeStatusTag episodeNumber={episodeNumber} />
            )}
          </>
        )}
        {ratingStatus && anime.rating && <RatingTag rating={anime.rating} />}
      </div>
      <p className="text-neumorph-secondary font-bold text-sm lg:text-base">
        {anime.type}
      </p>
    </div>
  );
};

export default AnimeCardFooterExtraDetails;
