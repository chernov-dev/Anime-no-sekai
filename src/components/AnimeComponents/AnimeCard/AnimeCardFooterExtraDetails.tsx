import { AiFillStar } from "react-icons/ai";
import { BsCloudsFill } from "react-icons/bs";
import { GoPlay } from "react-icons/go";
import Skeleton from "react-loading-skeleton";
import { IAnimeResult } from "../../../types/Anime";

const CompletedTag = ({ totalEpisodes }) => {
  return (
    <>
      {totalEpisodes && (
        <div className="ep-status">
          <span className="flex items-center gap-1 text-xs md:text-md">
            <p className="whitespace-pre">{totalEpisodes}</p>
            <BsCloudsFill size={15} />
          </span>
        </div>
      )}
    </>
  );
};
const EpisodeStatusTag = ({ episodeNumber }) => {
  return (
    <div className="ep-status">
      <span className="flex items-center gap-1.5 text-xs md:text-sm">
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
}: {
  anime: IAnimeResult | undefined;
}) => {
  const episodeNumber =
    anime?.episodeNumber ??
    anime?.totalEpisodes ??
    (Array.isArray(anime?.episodes)
      ? anime?.episodes.length
      : anime?.episodes ?? 0);

  return (
    <div className="text-neumorph-primary px-2 py-1.5 font-semibold items-center rounded-tl-none rounded-tr-none flex w-full h-[35px] gap-2 justify-between bg-neumorph-primary-dark">
      {anime ? <div className="skewed-text pl-1 items-center">
        {anime?.rating && <RatingTag rating={anime?.rating} />}
        {anime?.status == "Completed" && (
          <CompletedTag totalEpisodes={anime?.totalEpisodes} />
        )}
        {(anime?.status == "Ongoing" || anime?.status == undefined) && (
          <EpisodeStatusTag episodeNumber={episodeNumber} />
        )}
      </div> : <Skeleton width="5rem" height="1.5rem" style={{ lineHeight: "inherit" }} baseColor={"rgb(var(--neumorph-primary))"} />}
      <div className="w-12">
        <p className="text-primary font-bold text-sm lg:text-base">
          {anime?.type ?? <Skeleton baseColor={"rgb(var(--neumorph-primary))"} />}
        </p>
      </div>
    </div>
  );
};

export default AnimeCardFooterExtraDetails;
