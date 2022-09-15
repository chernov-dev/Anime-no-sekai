import React from "react";
import {
  BsFillCalendarCheckFill,
  BsHeartFill,
  BsShareFill,
} from "react-icons/bs";

const ShareOptionsContainer = ({
  onHeartClick = (e) => e.stopPropagation(),
  heartColor = "",
}) => {
  return (
    <>
      <span onClick={onHeartClick}>
        <BsHeartFill color={heartColor}></BsHeartFill>
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

export default ShareOptionsContainer;
