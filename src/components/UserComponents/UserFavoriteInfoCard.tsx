import { GoListUnordered } from "react-icons/go";
import Skeleton from "react-loading-skeleton";

const UserFavoriteInfoCard = ({ favoritesQuantity }) => {
  return (
    <div className="flex flex-col justify-between gap-2 px-3 py-2 w-full bg-neumorph-primary shadow-neumorphic rounded-xl ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10">
      <h1 className="text-base md:text-xl text-primary">Anime list</h1>
      <div className="neumorphic-chip text-primary text-opacity-70 text-sm">
        <GoListUnordered size={25} />
        <div className="flex gap-1">
          Anime in the list:
          <span className="text-neumorph-accent">
            {favoritesQuantity ?? <Skeleton width="5rem" />}
          </span>
        </div>
      </div>
      <div className="neumorphic-chip text-primary text-opacity-70 text-sm">
        <GoListUnordered size={25} />
        <div className="flex gap-1">
          Ongoing:
          <span className="text-neumorph-accent">
            {favoritesQuantity ?? <Skeleton width="5rem" />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserFavoriteInfoCard;
