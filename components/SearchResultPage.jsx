import React, { useEffect } from "react";
import { AnimeContainerComponent } from "../../src/components/AnimeComponents/AnimeCard/AnimeContainerComponent";

export const SearchResultPage = (props) => {
  const { result } = props;

  useEffect(() => {
    console.log(result);
  }, []);

  return <></>;
};
