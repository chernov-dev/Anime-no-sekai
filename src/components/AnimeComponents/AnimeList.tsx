import React from "react";
import { IAnime } from "../../types/Anime";
import AnimeCard from "./AnimeCard/AnimeCard";

function AnimeList({ animeArray, children } : {animeArray: IAnime[], children?: React.ReactNode}) {
  return (
    <div className="animeList">
      {animeArray?.map((anime) => (
        <AnimeCard key={anime.id} anime={anime}></AnimeCard>
      ))}
      {children}
    </div>
  );
}

export default AnimeList;
