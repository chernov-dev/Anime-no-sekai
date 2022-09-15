import React from "react";
import AnimeCard from "./AnimeCard/AnimeCard";

function AnimeList({ animeList, children }) {
  return (
    <div className="animeList">
      {animeList?.map((anime) => (
        <AnimeCard key={anime.id} anime={anime}></AnimeCard>
      ))}
      {children}
    </div>
  );
}

export default AnimeList;
