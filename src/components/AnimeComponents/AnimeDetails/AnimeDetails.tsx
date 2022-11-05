import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { BsInfo } from "react-icons/bs";
import { CgChevronDown } from "react-icons/cg";
import { handleDate } from "../../../utils/handleDate";
import ShareOptions from "../../Shared/ShareOptions";
import { shimmer, toBase64 } from "../../Shared/shimmer";
const parse = require("html-react-parser");

const AnimeDetails = ({ anime }) => {
  const nextEpisode = handleDate(anime.nextAiringEpisode?.airingTime);

  return (
    <div className="animeCard">
      <div className="animeCard-content w-full">
        <div className="animeCard-header">
          <Image
            src={anime.image}
            style={{ borderRadius: "inherit" }}
            alt="preview"
            height="394"
            width="300"
            placeholder="blur"
            sizes="30vw"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(394, 300)
            )}`}
          />
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
            <Menu>
              <div className="h-fit shadow-neumorphic rounded-xl text-left text-primary ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10 transition-all duration-500">
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className={"p-2"}>
                    <ul className="list-disc px-10 py-4 shadow-neumorphic-inner rounded-lg">
                      <li>Status: {anime.status}</li>
                      <li className="text-primary">
                        {anime.studios.length == 1 ? "Studio:" : "Studios:"}{" "}
                        {anime.studios}
                      </li>
                      <li className="">
                        <p>Release date: {anime.startDate.year}</p>
                      </li>
                      <li className="">
                        <p>
                          Episodes: {anime.episodes.length}/
                          {anime.totalEpisodes}
                        </p>
                      </li>
                      {nextEpisode && <li>Next episode: {nextEpisode}</li>}
                    </ul>
                  </Menu.Items>
                </Transition>
                <Menu.Button className="p-2 w-full hover:text-secondary">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <BsInfo size={25} className="neumorphic-icon h-fit" />
                      <span className="text-base">Info</span>
                    </div>
                    <CgChevronDown size={30} />
                  </div>
                </Menu.Button>
              </div>
            </Menu>
          </div>
        </div>
        {anime.description && (
          <div className="anime-body my-4 rounded-xl shadow-neumorphic-inner ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5">
            <p className="anime-desc p-12">{parse(anime.description)}</p>
          </div>
        )}
        <div className="anime-footer">
          <div className="animeCard-share">
            <ShareOptions anime={anime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
