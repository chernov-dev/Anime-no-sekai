import AnimeComponent from "./AnimeComponent";

import { useEffect } from "react";

export const AnimeContainerComponent = (anime) => {
  useEffect(() => {}, []);

  return (
    <>
      <AnimeComponent anime={anime} />
    </>
  );
};
