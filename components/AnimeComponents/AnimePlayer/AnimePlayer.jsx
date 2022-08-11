import { React, useEffect, useState } from "react";
import ReactPlayer from "react-player/file";

const AnimePlayer = ({ animeplaylist, animeSubTitle, animeEpisodeComing }) => {
  const playerDefaults = {
    url:
      animeplaylist[0].hd ??
      animeplaylist[0].std ??
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    pip: true,
    playing: false,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    stopOnUnmount: false,
  };

  const [playerState, setPlayerState] = useState(playerDefaults);
  const [episodeInput, setEpisodeInput] = useState(1);
  const [playerEpisodes, setPlayerEpisodes] = useState({
    episodes: animeplaylist,
  });

  const episodeOptions = playerEpisodes.episodes.map((episode, index) => {
    return { value: index, label: `${episode.name}` };
  });

  const handleEpisodeChange = (e) => {
    setPlayerState((prev) => {
      return {
        ...prev,
        url:
          playerEpisodes.episodes[e].std != null
            ? playerEpisodes.episodes[e].std
            : playerEpisodes.episodes[e].hd,
      };
    });
  };

  const handleEpisodeSubmit = (e) => {
    e.preventDefault();
    setPlayerEpisodes((prev) => {
      return { ...prev, currentEpisode: episodeInput };
    });
    setPlayerState((prev) => {
      return {
        ...prev,
        url:
          playerEpisodes.episodes[playerEpisodes.currentEpisode - 1].std != null
            ? playerEpisodes.episodes[playerEpisodes.currentEpisode - 1].std
            : playerEpisodes.episodes[playerEpisodes.currentEpisode - 1].hd,
      };
    });
  };

  return (
    <>
      <div className="flex justify-between px-5 py-3">
        <div className="anime-player__title">
          {animeSubTitle} ({animeEpisodeComing ?? episodes.length + " Серий"})
        </div>
        <div className="flex gap-2 flex-wrap justify-end items-center">
          <select
            className="anime-player__episode"
            name="Select episode"
            defaultValue={episodeOptions[0].label}
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
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          url={playerState.url}
          playing={playerState.playing}
          volume={playerState.volume}
          controls={playerState.controls}
        />
      </div>
    </>
  );
};

export default AnimePlayer;
