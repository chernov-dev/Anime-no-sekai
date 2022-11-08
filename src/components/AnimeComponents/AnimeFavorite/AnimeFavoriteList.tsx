import { Tab } from "@headlessui/react";
import { BsHeartFill } from "react-icons/bs";
import AnimeGridLayoutView from "../AnimeHome/AnimeGridLayout/AnimeGridLayoutView";
import AnimeFavoriteFilter from "./AnimeFavoriteFilter";

const FavoriteEmpty = () => (
  <div className="grid place-content-center my-12 min-h-[200px] bg-neumorph-secondary-light rounded-lg ">
    <span className="flex flex-wrap items-center justify-center gap-2 text-lg">
      <b>No anime found</b>, you can add them by clicking
      <BsHeartFill color={"rgb(var(--neumorph-accent))"} />
      icon at the bottom right of the anime card
    </span>
  </div>
);

const AnimeFavoriteList = ({ anime, ongoing, completed }) => {
  return (
    <div className="flex w-full grow justify-center">
      <div className="px-4 w-full">
        <Tab.Group>
          <div className="anime-home__header">
            <h1 className="text-lg md:text-xl section-heading">
              Your favorite list
            </h1>
            <AnimeFavoriteFilter />
          </div>
          {(anime?.length === 0 || !anime) && <FavoriteEmpty />}
          <Tab.Panels className={"my-8"}>
            <Tab.Panel>
              <AnimeGridLayoutView anime={anime} />
            </Tab.Panel>
            <Tab.Panel>
              <AnimeGridLayoutView anime={ongoing} />
            </Tab.Panel>
            <Tab.Panel>
              <AnimeGridLayoutView anime={completed} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AnimeFavoriteList;
