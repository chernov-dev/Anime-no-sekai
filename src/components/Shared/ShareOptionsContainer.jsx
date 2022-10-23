import React from "react";
import { BsHeartFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiNotification3Fill } from "react-icons/ri";

const ShareOptionsContainer = ({
  onHeartClick = (e) => e.stopPropagation(),
  liked = false,
  isFavoritesLoading = false,
}) => {
  return (
    <>
      <button
        disabled={isFavoritesLoading}
        className={`neumorphic-icon ${liked ? "active" : ""}`}
        onClick={onHeartClick}
      >
        <BsHeartFill
          color={liked ? "var(--neumorph-accent)" : "inherit"}
          size={15}
        ></BsHeartFill>
      </button>
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
