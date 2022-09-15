import React, { useContext, useEffect, useState } from "react";
import {
  BsFillCalendarCheckFill,
  BsHeartFill,
  BsShareFill,
} from "react-icons/bs";
import { UserPreferencesContext } from "../../context/UserPreferencesProvider";
import ShareOptionsContainer from "./ShareOptionsContainer";

const ShareOptions = ({ anime }) => {
  const preferences = useContext(UserPreferencesContext);
  const { favourite, setFavourite } = preferences.animes;

  const [liked, setLiked] = useState(false);
  const isFavourite = favourite?.some((e) => e.id === anime.id);

  useEffect(() => {
    setLiked(isFavourite);
  }, [isFavourite]);

  const onHeartClick = (e) => {
    e.stopPropagation();
    console.log(e);
    if (isFavourite) {
      setFavourite((prevState) =>
        prevState.filter((e) => {
          return e.id != anime.id;
        })
      );
    } else {
      setFavourite((prevState) => [...prevState, anime]);
    }
    setLiked((prevState) => !prevState);
  };

  const likeColor = liked ? "red" : "";

  return (
    <ShareOptionsContainer heartColor={likeColor} onHeartClick={onHeartClick} />
  );
};

export default ShareOptions;
