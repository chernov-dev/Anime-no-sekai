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
import AnimeInfo from "../../components/AnimeComponents/AnimeCard/AnimeInfo";

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
        <AnimeInfo animeInfo={animeInfo} />
        <div className="anime-player">
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
