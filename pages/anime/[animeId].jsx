import Head from "next/head";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import AnimePlayer from "../../components/AnimeComponents/AnimePlayer/AnimePlayer";
import "../../styles/Home.module.css";
import requests from "../../utils/requests";
import Image from "next/image";
import { BsShareFill } from "react-icons/bs";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

export default function Anime() {
  const router = useRouter();
  const {
    query: { animeId },
  } = router;

  const [animeInfo, setAnimeInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getAnimeInfo();
  }, [router.isReady, animeId]);

  if (isLoading) return null;
  if (!animeInfo) return <p>Anime not found</p>;
  return (
    <div>
      <Head>
        <title>ANS - {animeInfo.title.en}</title>
        <meta name="description " content={`ANS - ${animeInfo.title.en}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center">
        <div className="anime-card">
          <div className="anime-card__overlay"></div>
          <div className="anime-card__content">
            <div className="anime-card__header">
              <div className="anime-card__header-overlay__gradient" />
              <div>
                <Image
                  src={animeInfo.img.src}
                  className="anime-card__img"
                  alt="preview"
                  height="394px"
                  width="300px"
                  layout="fixed"
                />
              </div>
              <div className="anime-card__header-body">
                <h4 className="anime-card__title">{animeInfo.title.ru}</h4>
                <h4 className="anime-card__subtitle">{animeInfo.title.en}</h4>
                <h4 className="anime-card__info">
                  {animeInfo.extra.year}, {animeInfo.extra.director}
                </h4>
                <div className="anime-card__type">
                  <p>{animeInfo.extra.type}</p>
                  {animeInfo.extra.genre}
                </div>
              </div>
            </div>
            <div className="anime-card__body">
              <p className="anime-card__desc">{animeInfo.description}</p>
            </div>
            <div className="anime-card__footer">
              <div className="anime-card__share">
                <span onClick={() => console.log("go")}>
                  <BsHeartFill />
                </span>
                <span onClick={() => console.log("go")}>
                  <BsFillCalendarCheckFill />
                </span>
                <span onClick={() => console.log("go")}>
                  <BsShareFill />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="anime-player-card">
          <AnimePlayer
            animeplaylist={animeInfo.episodes}
            animeSubTitle={animeInfo.title.en}
            animeEpisodeComing={animeInfo.comingUp}
          />
        </div>
      </main>
    </div>
  );

  function getAnimeInfo() {
    if (router.isReady) {
      setLoading(true);
      fetch(`${requests.fetchAnimeInfo}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        type: "cors",
        body: `id=${animeId ?? id}`,
      })
        .then((res) => res.json())
        .then((data) => {
          let _animeInfo = data;
          let animeEpisodes = _animeInfo.data[0].series
            .replace("{", "")
            .replace("}", "")
            .split(",")
            .map((episode_) => {
              let episodeId = episode_.replace(/'/g, "").split(":")[1];
              let episodeName = episode_.replace(/'/g, "").split(":")[0];
              let episodeUrlHd = `https://video.animetop.info/720/${episodeId}.mp4`;
              let episodeUrlStd = `https://video.animetop.info/${episodeId}.mp4`;
              return {
                name: episodeName,
                hd: episodeUrlHd,
                std: episodeUrlStd,
              };
            });

          let formatTitle = _animeInfo.data[0].title.split(" / ");
          let animeTitle = formatTitle[0];
          let animeTitleEn = formatTitle[1].split("[")[0];
          let animeEpisodeComing = formatTitle[1]
            .split("[")[1]
            .replace(/]/g, "");
          let animeDesc = _animeInfo.data[0].description.replace(
            /<([^>]*)>/g,
            ""
          );

          let anime = {
            img: {
              src: _animeInfo.data[0].urlImagePreview,
            },
            title: {
              formatted: formatTitle,
              ru: animeTitle,
              en: animeTitleEn,
            },
            comingUp: animeEpisodeComing,
            description: animeDesc,
            episodes: animeEpisodes,
            extra: {
              director: _animeInfo.data[0].director,
              year: _animeInfo.data[0].year,
              genres: _animeInfo.data[0].genre,
              type: _animeInfo.data[0].type,
            },
          };
          setAnimeInfo(anime);
          setLoading(false);
        });
    }
  }
}
