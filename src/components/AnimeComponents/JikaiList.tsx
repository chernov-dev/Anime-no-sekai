import Image from "next/image";
import { Router } from "next/router";
import React from "react";
import { IAnime } from "../../types/Anime";
import ShareOptions from "../Social/ShareOptions";
import { shimmer, toBase64 } from "../utils/shimmer";
import { useRouter } from 'next/router'

const JikaiCard = ({ anime }: { anime: IAnime }) => {
  const router = useRouter();
  const validImgSrcUrl = `${anime.images.jpg.large_image_url}`;

  return (
    <div
      className="animeCard"
      onClick={(e) => {
        router.push(`/anime/${anime.id}`);
      }}
    >
      <div className="animeCard-content">
        <div className="animeCard-header">
          <div className="animeCard-img">
              <Image
                src={validImgSrcUrl}
                alt="preview"
                width="150px"
                height="225px"
                layout="responsive"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
          </div>
          <div className="animeCard-header__content">
            <h4 className="anime-title">{anime.titles.en}</h4>
            <p className="anime-info">{anime.year}</p>
            <div className="anime-genres">
              <p className="anime-type">{anime.type?.toLowerCase()}</p>
              {anime.genres.map((g, index) => (
                <p key={index}>{g.name}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="animeCard-body">
          <p className="anime-desc short">{anime.synopsis?.slice(0, 190)}...</p>
        </div>
        <div className="anime-footer">
          <div className="animeCard-share">
            <ShareOptions anime={anime} />
          </div>
        </div>
      </div>
    </div>
  );
};

const JikaiList = ({
  animeArray,
  children,
}: {
  animeArray: IAnime[];
  children?: React.ReactNode;
}) => {
  return (
    <div className="animeList">
      {animeArray?.map((anime) => (
        <JikaiCard key={anime.id} anime={anime}></JikaiCard>
      ))}
      {children}
    </div>
  );
};

export default JikaiList;
