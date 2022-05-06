import { React, useEffect, useState } from "react";
import ReactPlayer from "react-player/file";

const AnimePlayer = ({ animeplaylist, animeSubTitle, animeEpisodeComing }) => {
  const playerDefaults = {
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
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

  const [playerEpisodes, setPlayerEpisodes] = useState({
    currentEpisode: 1,
    episodes: animeplaylist,
  });

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const handleEpisodeChange = (e) => {
    setPlayerEpisodes((prev) => {
      return { ...prev, currentEpisode: Number(e.target.value) };
    });
  };

  const handleEpisodeSubmit = (e) => {
    e.preventDefault();
    setPlayerState((prev) => {
      return {
        ...prev,
        url:
          playerEpisodes.episodes[playerEpisodes.currentEpisode - 1].hd != null
            ? playerEpisodes.episodes[playerEpisodes.currentEpisode - 1].hd
            : playerEpisodes.episodes[playerEpisodes.currentEpisode - 1].std,
      };
    });
  };

  return (
    <>
      <div className="flex justify-between px-5 py-3">
        <div className="anime-player__title">
          {animeSubTitle} ({animeEpisodeComing ?? ""})
        </div>
        <div className="flex gap-2 flex-wrap justify-end items-center">
          <form onSubmitCapture={(e) => handleEpisodeSubmit(e)}>
            <input
              type="number"
              name="epSelector"
              className="py-1 px-2 text-black rounded min-w-[90px]"
              placeholder={"Episode"}
              onChange={(e) => handleEpisodeChange(e)}
              min={1}
              max={playerEpisodes.episodes.length}
            />
          </form>
          <div className="anime-player__episode">
            {playerEpisodes.currentEpisode} Серия
          </div>
        </div>
      </div>
      <div className="player-wrapper">
        {isSSR ? null : (
          <ReactPlayer
            className="react-player"
            width="100%"
            height="100%"
            url={playerState.url}
            playing={playerState.playing}
            volume={playerState.volume}
            controls={playerState.controls}

            // onPause={() => setPlayerState({ ...playerState, playing: false })}
            // onPlay={() =>
            //   setPlayerState({ ...playerState, controls: true, playing: true })
            // }
          />
        )}
      </div>
    </>
  );
};

export default AnimePlayer;
