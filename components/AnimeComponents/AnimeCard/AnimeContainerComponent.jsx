import AnimeComponent from "./AnimeComponent";

import { useEffect } from "react";

export const AnimeContainerComponent = (anime) => {
  return (
    <>
      <AnimeComponent anime={anime} />
    </>
  );
};
