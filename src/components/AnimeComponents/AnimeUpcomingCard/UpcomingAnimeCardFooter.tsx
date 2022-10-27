import { AiFillCalendar, AiFillHeart, AiFillStar } from "react-icons/ai";

const UpcomingAnimeCardFooter = ({ type, popularity, year, favorites }) => {
  return (
    <div className="text-neumorph-primary px-2 py-1.5 font-semibold items-center rounded-tl-none rounded-tr-none flex w-full h-full gap-2 justify-between bg-neumorph-primary-dark">
      <div className="skewed-text pl-1">
        <div
          className="popularity-status"
          title={`Popularity around anime - ${popularity}`}
        >
          <span className="flex items-center gap-1 text-xs md:text-sm">
            <p className="whitespace-pre">{popularity}</p>
            <AiFillStar size={15} />
          </span>
        </div>
        <div
          className="favorites-status bg-red-500"
          title={`Favorited by - ${favorites}`}
        >
          <span className="flex items-center gap-1 text-xs md:text-sm">
            <p className="whitespace-pre">{favorites}</p>
            <AiFillHeart size={15} />
          </span>
        </div>
        <div
          className="year-status bg-neumorph-secondary"
          title={`Coming Out in - ${year ?? "N/A"}`}
        >
          <span className="flex items-center gap-1 text-xs md:text-sm">
            <p className="whitespace-pre">{year ?? "N/A"}</p>
            <AiFillCalendar size={15} />
          </span>
        </div>
      </div>
      <p className="text-neumorph-secondary font-bold text-sm lg:text-base">
        {type}
      </p>
    </div>
  );
};

export default UpcomingAnimeCardFooter;
