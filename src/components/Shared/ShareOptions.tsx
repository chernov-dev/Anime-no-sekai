import React, { useContext, useEffect, useState } from "react";
import { UserPreferencesContext, useUserPreferences } from "../../context/UserPreferencesProvider";
import useAddFavorite from "../../hooks/useAddFavorite";
import "react-toastify/dist/ReactToastify.css";
import useRemoveFavorite from "../../hooks/useRemoveFavorite";
import ShareOptionsContainer from "./ShareOptionsContainer";
import { toast } from "react-toastify";

const ShareOptions = ({ anime }) => {

  const removeFavorite = useRemoveFavorite(anime.id);
  const addFavorite = useAddFavorite(anime.id);

  const { favoriteIds } = useUserPreferences();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(favoriteIds?.some((e) => e == anime.id));
  }, [anime.id, favoriteIds]);

  const onHeartClick = (e) => {
    e.stopPropagation();
    if(liked) {
      removeFavorite.mutate()
    }
    else {
      addFavorite.mutate()
    }
  }

  return (
    <ShareOptionsContainer
      liked={liked}
      onHeartClick={onHeartClick}
    />
  );
};

export default ShareOptions;
