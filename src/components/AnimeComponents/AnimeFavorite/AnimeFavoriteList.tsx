import { Tab } from "@headlessui/react";
import { BsHeartFill } from "react-icons/bs";
import ShareOptionsContainer from "../../Shared/ShareOptionsContainer";
import AnimeGridLayoutView from "../AnimeHome/AnimeGridLayout/AnimeGridLayoutView";
import AnimeFavoriteFilter from "./AnimeFavoriteFilter";

const AnimeFavoriteList = ({ anime, ongoing, completed }) => {
  return (
    <div className="flex w-full grow justify-center">
      <div className="px-4 w-full">
        <Tab.Group>
          <div className="anime-home__header">
            <h1 className="section-heading">Your favorite list</h1>
            <AnimeFavoriteFilter />
          </div>
          {(!anime && anime?.length) && (
            <div className="flex flex-wrap items-center justify-center gap-2 my-12 neumorphic-grid min-h-[200px]">
              <b>No anime found</b>, add them by touching
              <BsHeartFill color={"var(--neumorph-accent)"} />
              icon on bottom right of the anime card
              <div className="p-2 rounded bg-opacity-20 flex gap-2">
                <ShareOptionsContainer />
              </div>
            </div>
          )}
          <Tab.Panels>
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
