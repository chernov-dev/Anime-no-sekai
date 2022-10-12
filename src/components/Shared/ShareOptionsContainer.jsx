import React from "react";
import {
  BsFillCalendarCheckFill,
  BsHeartFill,
  BsShareFill,
} from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiNotification3Fill } from "react-icons/ri";
import { PuffLoader } from "react-spinners";

const ShareOptionsContainer = ({
  onHeartClick = (e) => e.stopPropagation(),
  liked = false,
  isFavoritesLoading = false,
}) => {
  return (
    <>
      {isFavoritesLoading ? (
        <PuffLoader />
      ) : (
        <button
          disabled={isFavoritesLoading}
          className={`neumorphic-icon ${liked ? "active" : ""}`}
          onClick={onHeartClick}
        >
          <BsHeartFill
            color={liked ? "red" : "inherit"}
            size={15}
          ></BsHeartFill>
        </button>
      )}
      <button className="neumorphic-icon" onClick={(e) => e.stopPropagation()}>
        <RiNotification3Fill size={15} color="inherit" />
      </button>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ShareOptionsContainer;
