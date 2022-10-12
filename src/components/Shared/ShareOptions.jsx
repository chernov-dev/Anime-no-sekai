import React, { useContext, useEffect, useState } from "react";
import {
  BsFillCalendarCheckFill,
  BsHeartFill,
  BsShareFill,
} from "react-icons/bs";
import { UserPreferencesContext } from "../../context/UserPreferencesProvider";
import useAddFavorite from "../../hooks/useAddFavorite";
import useFavorites from "../../hooks/useFavorites";
import "react-toastify/dist/ReactToastify.css";
import useRemoveFavorite from "../../hooks/useRemoveFavorite";
import ShareOptionsContainer from "./ShareOptionsContainer";
import { toast } from "react-toastify";

const ShareOptions = ({ anime }) => {
  const context = useContext(UserPreferencesContext);
  // const { favorite, setFavorite } = context;

  const addFavorite = useAddFavorite(anime.id);
  const removeFavorite = useRemoveFavorite(anime.id);
  const {
    data: favorites,
    isLoading: isFavoritesLoading,
    onSuccess,
  } = useFavorites();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(favorites?.some((e) => e.id === anime.id));
  }, [anime.id, favorites]);

  const onHeartClick = (e) => {
    e.stopPropagation();
    if (liked) {
      removeFavorite.mutate();
      toast.info("Removed from Favorites", { icon: "❌" });
      setLiked((prevState) => !prevState);
      // setFavorite((prevState) =>
      //   prevState.filter((e) => {
      //     return e.id != anime.id;
      //   })
      // );
    } else {
      addFavorite.mutate();
      toast.success("Added to Favorites", { icon: "✔️" });
      setLiked((prevState) => !prevState);
      // setFavorite((prevState) => [...prevState, anime]);
    }
  };

  return (
    <ShareOptionsContainer
      liked={liked}
      onHeartClick={onHeartClick}
      isFavoritesLoading={isFavoritesLoading}
    />
  );
};

export default ShareOptions;
