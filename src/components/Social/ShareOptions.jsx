import React, { useContext, useEffect, useState } from "react";
import {
  BsFillCalendarCheckFill,
  BsHeartFill,
  BsShareFill,
} from "react-icons/bs";
import { UserPreferencesContext } from "../../context/UserPreferencesProvider";

const ShareOptions = ({ anime }) => {
  const preferences = useContext(UserPreferencesContext);
  const { favourite, setFavourite } = preferences.animes;

  const [liked, setLiked] = useState(false);
  const isFavourite = favourite?.some((e) => e.id === anime.id);

  useEffect(() => {
    setLiked(isFavourite);
  }, [isFavourite]);

  const handleLike = (e) => {
    e.stopPropagation();

    if (isFavourite) {
      setFavourite((prevState) => prevState.filter((e) => e.id != anime.id));
    } else {
      setFavourite((prevState) => [...prevState, anime]);
    }
    setLiked((prevState) => !prevState);
  };

  return (
    <>
      <span onClick={(setName) => handleLike(setName)}>
        <BsHeartFill color={`${liked ? "red" : ""}`}></BsHeartFill>
      </span>
      <span onClick={(e) => e.stopPropagation()}>
        <BsFillCalendarCheckFill />
      </span>
      <span onClick={(e) => e.stopPropagation()}>
        <BsShareFill />
      </span>
    </>
  );
};

export default ShareOptions;
