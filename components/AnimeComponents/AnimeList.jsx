import React from "react";
import AnimeCard from "./AnimeCard/AnimeCard";

function AnimeList({ animeList, children }) {
  return (
    <div className="animeList">
      {animeList.map((anime, index) => (
        <AnimeCard key={index} anime={anime}></AnimeCard>
      ))}
      {children}
    </div>
  );
}

export default AnimeList;
