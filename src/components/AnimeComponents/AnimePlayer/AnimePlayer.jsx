import Error from "next/error";
import { React, useEffect, useState } from "react";
import ReactPlayer from "react-player/file";

const AnimePlayer = ({ animePlayList, animeTitle }) => {
  let firstEpisode = animePlayList[0];
  console.log("playlist", firstEpisode);

  //React Player SSR fix
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const playerDefaults = {
    url:
      firstEpisode?.hd ??
      firstEpisode?.std ??
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    light: firstEpisode?.preview,
    pip: true,
    playing: false,
    controls: true,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    stopOnUnmount: false,
  };

  const episodeOptions = animePlayList.map((episode, index) => {
    return { value: index, label: `${episode.name}` };
  });

  const [playerState, setPlayerState] = useState(playerDefaults);

  const handleEpisodeChange = (e) => {
    setPlayerState((prev) => {
      return {
        ...prev,
        url:
          animePlayList[e].std != null
            ? animePlayList[e].std
            : animePlayList[e].hd,
      };
    });
  };
  if (animePlayList.length == 0) {
    return (
      <div className="flex justify-between px-2 pb-3 gap-2">
        <div className="anime-player__title">
          <p>{animeTitle} </p>
          <p className="text-gray-400 text-lg">No video available right now!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between px-2 pb-3 gap-2">
        <div className="anime-player__title">
          <p>
            {animeTitle}{" "}
            {/* <span className="text-slate-400">({animeEpisodeComing})</span> */}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <select
            className="anime-player__episode"
            name="Select episode"
            defaultValue={episodeOptions[0]?.label}
            onChange={(e) => handleEpisodeChange(e.target.value)}
          >
            {episodeOptions.map((episode, index) => {
              return (
                <option key={index} value={episode.value}>
                  {episode.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="player-wrapper">
        {hasWindow && (
          <ReactPlayer
            className="react-player"
            width="100%"
            height="100%"
            url={playerState.url}
            playing={playerState.playing}
            volume={playerState.volume}
            controls={playerState.controls}
          />
        )}
      </div>
    </>
  );
};

export default AnimePlayer;
