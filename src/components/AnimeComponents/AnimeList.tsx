import React from "react";
import AnimeCard from "./AnimeCard/AnimeCard";
import AnimeDetails from "./AnimeDetails";

function AnimeList({ animeArray, children } : {animeArray, children?: React.ReactNode}) {
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
