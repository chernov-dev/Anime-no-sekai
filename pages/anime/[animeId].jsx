import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AnimePlayer from "../../components/AnimePlayer/AnimePlayer";
import "../../styles/Home.module.css";
import requests from "../../utils/requests";
import Image from "next/image";
import { BsShareFill } from "react-icons/bs";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

export default function Anime({ anime, episodes }) {
  let router = useRouter();
  const { animeId } = router.query;
  const [animeInfo, setAnimeInfo] = useState(anime);

  // const [previewImage, setPreviewImage] = useState(
  //   `https://static.openni.ru/${anime.screenImage[0]}`
  // );
  // const [previewSequence, setPreviewSequence] = useState(0);

  // const handlePreviewClick = () => {
  //   setPreviewSequence((current) => ++current);
  //   if (previewSequence >= anime.screenImage.length - 1) {
  //     setPreviewSequence(0);
  //   }
  //   let url = `https://static.openni.ru/${anime.screenImage[previewSequence]}`;
  //   setPreviewImage(url);
  // };
  return (
    <>
      <Head>
        <title>ANS - Home</title>
        <meta name="description" content="Generated by create next app" />
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
                  src={anime.img.src}
                  className="anime-card__img"
                  alt="preview"
                  height="394px"
                  width="300px"
                  layout="fixed"
                />
              </div>
              <div className="anime-card__header-body">
                <h4 className="anime-card__title">{anime.title.ru}</h4>
                <h4 className="anime-card__subtitle">{anime.title.en}</h4>
                <h4 className="anime-card__info">
                  {anime.extra.year}, {anime.extra.director}
                </h4>
                <div className="anime-card__type">
                  <p>{anime.extra.type}</p>
                  {anime.extra.genre}
                </div>
              </div>
            </div>
            <div className="anime-card__body">
              <p className="anime-card__desc">{anime.description}</p>
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
            animeplaylist={episodes}
            animeSubTitle={anime.title.en}
            animeEpisodeComing={anime.comingUp}
          />
        </div>
      </main>
    </>
  );
}
// <div className="anime-card">
//   <div className="anime-card__content">
//     <div className="anime-card__header">
//       <div className="anime-card__title">{animeTitle}</div>
//       <div className="anime-card__subtitle">{animeSubTitle}</div>
//     </div>
//     <div className="anime-card__body">
//       <div className="anime-card__img">
//         <img src={anime.urlImagePreview} alt="preview"></img>
//       </div>
//       <div className="anime-card__info">
//         <ul>
//           <li className="anime-card__year">
//             <p>Год выхода</p>
//             <p>{anime.year}</p>
//           </li>
//           <li className="anime-card__genre">
//             <p>Год выхода</p>
//             <p>{anime.year}</p>
//           </li>
//           <li className="anime-card__producers">
//             <p>Год выхода</p>
//             <p>{anime.year}</p>
//           </li>
//         </ul>
//       </div>
//       <div className="anime-card__buttons"></div>
//     </div>
//   </div>
// </div>
// <div className="container self-center">
//   <AnimePlayer playerEpisodes={anime.episodes} />
// </div>

// export const getServerSideProps = async (context) => {
//   const [animeInfo] = await Promise.all([
//     fetch(`${requests.fetchAnimeInfo}`, {
//       method: "POST", // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: `id=${context.query.animeId}`,
//     }).then((res) => res.json()),
//   ]);
//   let animeEpisodes = animeInfo.data[0].series
//     .replace("{", "")
//     .replace("}", "")
//     .split(",")
//     .map((episode_) => {
//       let episode;
//       let episodeId = episode_.replace(/'/g, "").split(":")[1];
//       let episodeName = episode_.replace(/'/g, "").split(":")[0];
//       let episodeUrlHd = `http://video.animetop.info/720/${episodeId}.mp4`;
//       let episodeUrlStd = `http://video.animetop.info/${episodeId}.mp4`;
//       return (episode = {
//         name: episodeName,
//         hd: episodeUrlHd,
//         std: episodeUrlStd,
//       });
//     });

//   return {
//     props: {
//       anime: { ...animeInfo.data[0], episodes: animeEpisodes },
//     },
//   };
// };

export const getServerSideProps = async (context) => {
  const [animeInfo] = await Promise.all([
    fetch(`${requests.fetchAnimeInfo}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `id=${context.params.animeId}`,
    }).then((res) => res.json()),
  ]);

  let animeEpisodes = animeInfo.data[0].series
    .replace("{", "")
    .replace("}", "")
    .split(",")
    .map((episode_) => {
      let episodeId = episode_.replace(/'/g, "").split(":")[1];
      let episodeName = episode_.replace(/'/g, "").split(":")[0];
      let episodeUrlHd = `http://video.animetop.info/720/${episodeId}.mp4`;
      let episodeUrlStd = `http://video.animetop.info/${episodeId}.mp4`;
      return {
        name: episodeName,
        hd: episodeUrlHd,
        std: episodeUrlStd,
      };
    });

  let formatTitle = animeInfo.data[0].title.split(" / ");
  let animeTitle = formatTitle[0];
  let animeTitleEn = formatTitle[1].split("[")[0];
  let animeEpisodeComing = formatTitle[1].split("[")[1].replaceAll("]", "");
  let animeDesc = animeInfo.data[0].description.replaceAll("<br />", "");

  let anime = {
    img: {
      src: animeInfo.data[0].urlImagePreview,
    },
    title: {
      formatted: formatTitle,
      ru: animeTitle,
      en: animeTitleEn,
    },
    comingUp: animeEpisodeComing,
    description: animeDesc,
    extra: {
      director: animeInfo.data[0].director,
      year: animeInfo.data[0].year,
      genres: animeInfo.data[0].genre,
      type: animeInfo.data[0].type,
    },
  };
  return {
    props: {
      anime: anime,
      episodes: animeEpisodes,
    },
  };
};
