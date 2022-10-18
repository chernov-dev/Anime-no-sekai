import Link from "next/link";
import React from "react";
import { GoSync } from "react-icons/go";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { RiHeartAddFill, RiNotification3Fill } from "react-icons/ri";
import AnsSvgLogo from "../../public/AnsSvgLogo";

const WelcomePageScreen = () => {
  return (
    <>
      <div className="section-welcome">
        <h1 className=" text-2xl md:text-4xl p-2 uppercase">Anime no Sekai</h1>
        <div className="welcome-logo">
          <AnsSvgLogo
            className={"text-black"}
            fill={"var(--neumorph-accent)"}
            stroke="red"
          />
        </div>
        <span className="text-lg max-w-[500px]">
          Anime no Sekai will let you{" "}
          <b className="text-neumorph-accent">watch, track, and get notified</b>{" "}
          when anime is out.
        </span>
        <Link passHref href={"/home"}>
          <button className="neumorphic-btn secondary p-2 text-lg gap-1 font-semibold h-12">
            <span>Go to Home</span> <IoArrowForwardCircleSharp size={35} />
          </button>
        </Link>
      </div>
      <div className="app-examples-section mt-14">
        <div className="favorite-anime-example-row">
          <div className="example-img h-[325px]"></div>
          <div className="flex flex-col justify-center gap-4 h-[325px] max-w-[500px] text-center shadow-neumorphic-inner rounded-lg p-4">
            <h1 className="text-2xl uppercase inline-flex justify-center items-center gap-2">
              Syncing <GoSync size={28} className="text-neumorph-accent" />
            </h1>
            <div className="rounded-2xl bg-opacity-20 inline-flex items-center gap-2">
              <p className="">
                Log in to your Google account to{" "}
                <b>sync your favorite anime and episodes you have watched</b>{" "}
                between your <b className="text-neumorph-accent">devices</b>
              </p>
            </div>
          </div>
        </div>
        <div className="favorite-anime-example-row">
          <div className="flex flex-col justify-center gap-4 h-[325px] max-w-[500px] text-center shadow-neumorphic-inner rounded-lg p-4">
            <h1 className="text-2xl uppercase inline-flex justify-center items-center gap-2">
              Preferences{" "}
              <RiHeartAddFill size={28} className="text-neumorph-accent" />
            </h1>
            <div className=" rounded-2xl bg-opacity-20 flex flex-col items-center gap-2">
              <span className="whitespace-wrap">
                <p>
                  Add{" "}
                  <b>
                    anime to your{" "}
                    <span className="text-neumorph-accent">favorite list</span>
                  </b>{" "}
                  and <b>view them on a separate page</b>.
                </p>
              </span>
            </div>
          </div>
          <div className="example-img h-[325px]"></div>
        </div>
        <div className="favorite-anime-example-row">
          <div className="example-img h-[325px]"></div>
          <div className="flex flex-col justify-center gap-4 h-[325px] max-w-[500px] text-center shadow-neumorphic-inner rounded-lg p-4">
            <h1 className="text-2xl uppercase inline-flex justify-center items-center gap-2">
              Notifications{" "}
              <RiNotification3Fill size={28} className="text-neumorph-accent" />
            </h1>
            <div className="rounded-2xl bg-opacity-20 flex flex-col items-center gap-2">
              <span className="whitespace-wrap">
                <p>
                  Subscribe {" "}
                  <b>and get <span className="text-neumorph-accent">notified weekly </span></b>
                  when anime is supposed to come out
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePageScreen;
