import { useQuery } from "@tanstack/react-query";
import Error from "next/error";
import { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { getEpisodeStreamingLinks } from "../../../api/Anime_API/getEpisodeStreamingLinks";
import { IAnimeEpisode, IEpisodeServer } from "../../../types/Anime";
import Spinner from "../../Shared/PageLoader";

const AnimePlayer = ({ episodes, animeCover }) => {

  const [selectedEpisodeId, setSelectedEpisodeId] = useState(episodes[0].id ?? "");
  const episodeTitle = episodes.find((episode : IAnimeEpisode) => episode.id == selectedEpisodeId).title;

  const { data, isLoading, isSuccess } = useQuery(
    ["anime-playlist", selectedEpisodeId],
    () => getEpisodeStreamingLinks(selectedEpisodeId),
  );

  //React Player SSR fix
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  {
    isLoading && <Spinner/>;
  }

  const [playerState, setPlayerState] = useState({
    episodes: episodes,
    url: "",
    volume: 0.8,
  });

  useEffect(() => {
    if (data) {
      const url =
        data.sources[3].url ??
        data.sources[4].url ??
        data.sources[2].url ??
        data.sources[1].url ??
        data.sources[0].url ??
        data.sources[5].url ??
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

      setPlayerState((prevState) => {
        return { ...prevState, url };
      });
    }
  }, [data, episodes]);

  // setPlayerState((prev) => {
  //     return {
  //       ...prev,
  //       url:
  //         data.sources[selectedEpisode].url != null
  //           ? data.sources[selectedEpisode].url
  //           : data.sources[selectedEpisode+1].url,
  //     };

  const handleEpisodeChange = (number: number) => {
    setSelectedEpisodeId(episodes[--number].id);
  };

  const episodeOptions = episodes.map((episode) => {
    return { value: episode.number, id: episode.id };
  });

  return (
    <>
      <div className="flex justify-between px-2 pb-3 gap-2 items-center w-full">
        <div className="anime-player__title  min-w-[168px]">
          <p className="short text-lg">
            {episodeTitle}
          </p>
          {/* <span className="text-slate-400">({animeEpisodeComing})</span> */}
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <select
            className="anime-player__episode"
            name="Select episode"
            defaultValue={episodeOptions[0]?.value}
            onChange={(e) => handleEpisodeChange(+e.currentTarget.value)}
          >
            {episodeOptions.map((episode, index) => {
              return (
                <option key={index} value={episode.value}>
                  Episode {episode.value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="player-overlay">
        <div className="player-wrapper">
          {hasWindow && isSuccess && (
            <ReactPlayer
              className="react-player"
              width="100%"
              height="100%"
              url={playerState.url}
              light={animeCover}
              playing={false}
              controls
              muted={false}
              played={0}
              loaded={0}
              duration={0}
              playbackRate={1}
              loop={false}
              stopOnUnmount={false}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AnimePlayer;
