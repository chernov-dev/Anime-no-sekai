import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getRecentAnimes } from "../../api/Anime_API/getRecentAnimes";
import AnimeFavoriteFilter from "./AnimeFavoriteFilter";
import AnimeGridLayoutView from "./AnimeGridLayoutView";

const AnimeFavoriteList = ({ anime, ongoing, completed }) => {

  return (
    <div className="flex justify-center grow w-full">
      <div className="px-4 w-full">
        <Tab.Group>
          <div className="anime-home__header mt-4">
            <h1 className="text-xl md:text-2xl">Your favorite list</h1>
            <AnimeFavoriteFilter/>
          </div>
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
