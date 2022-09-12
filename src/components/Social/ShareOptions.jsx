import React from "react";
import {
  BsFillCalendarCheckFill,
  BsHeartFill,
  BsShareFill,
} from "react-icons/bs";

const ShareOptions = () => {
  return (
    <>
      <span onClick={(e) => e.stopPropagation()}>
        <BsHeartFill></BsHeartFill>
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
