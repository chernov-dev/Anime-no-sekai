import React, { useContext, useEffect, useState } from "react";
import { UserPreferencesContext, useUserPreferences } from "../../context/UserPreferencesProvider";
import useAddFavorite from "../../hooks/useAddFavorite";
import "react-toastify/dist/ReactToastify.css";
import useRemoveFavorite from "../../hooks/useRemoveFavorite";
import ShareOptionsContainer from "./ShareOptionsContainer";
import { toast } from "react-toastify";

const ShareOptions = ({ anime }) => {


  const addFavorite = useAddFavorite(anime.id);
  const removeFavorite = useRemoveFavorite(anime.id);
  const { favorite } = useUserPreferences();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(favorite?.some((e) => e.id === anime.id));
  }, [anime.id, favorite]);

  const onHeartClick = (e) => {
    e.stopPropagation();
    if (liked) {
      removeFavorite.mutate();
      toast.info("Removed from Favorite", { icon: "❌" });
      setLiked((prevState) => !prevState);
    } else {
      addFavorite.mutate();
      toast.success("Added to Favorite", { icon: "✔️" });
      setLiked((prevState) => !prevState);
    }
  };

  return (
    <ShareOptionsContainer
      liked={liked}
      onHeartClick={onHeartClick}
    />
  );
};

export default ShareOptions;
