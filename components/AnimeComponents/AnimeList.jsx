import React from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard from "./AnimeCard/AnimeCard";

function AnimeList({ animeList, children }) {
  const { ref, inView, entry } = useInView();

  return (
    <div className="animeList">
      {animeList.map((anime, index) => (
        <AnimeCard
          inView={inView}
          ref={ref}
          key={index}
          anime={anime}
        ></AnimeCard>
      ))}
      {children}
    </div>
  );
}

export default AnimeList;
