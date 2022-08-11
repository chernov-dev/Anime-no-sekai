import React from "react";
import AnimeComponent from "./AnimeCard/AnimeComponent";

function AnimeList({ animeList, children }) {
  return (
    <div className="animeList">
      {animeList.map((anime, index) => (
        <AnimeComponent key={index} anime={anime}></AnimeComponent>
      ))}
      {children}
    </div>
  );
}

export default AnimeList;
