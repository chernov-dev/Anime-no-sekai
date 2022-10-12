import Head from "next/head";
import PaginationComponent from "../components/ReactPagination/PaginationComponent";
import AnimeList from "../components/AnimeComponents/AnimeList";
import { getRecentAnimes } from "../api/Anime_API/getRecentAnimes";
import JikaiList from "../components/AnimeComponents/JikaiList";
import AnimeHome from "../components/AnimeComponents/AnimeHome";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { GoSync } from "react-icons/go";
import loginForm from "../../public/web-log-in-choose-google-account.png";
import AnsSvgLogo from "../../public/AnsSvgLogo";
import { BsHeartFill } from "react-icons/bs";
import { RiHeartAddFill, RiNotification3Fill } from "react-icons/ri";
import ShareOptionsContainer from "../components/Social/ShareOptionsContainer";
import Link from "next/link";

function WelcomePage({ currentPage }) {
  return (
    <>
      <Head>
        <title>ANS - Home</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center w-full">
        <div className="section-welcome">
          <h1 className=" text-2xl md:text-4xl p-2 uppercase">
            Anime no Sekai
          </h1>
          <div className="welcome-logo">
            <AnsSvgLogo
              className={"text-black"}
              fill={"var(--neumorph-accent)"}
              stroke="red"
            />
          </div>
          <span className="text-lg max-w-[500px]">
            Anime no Sekai is a website that lets user{" "}
            <b className="text-neumorph-accent">
              watch, sync, track ratings, schedule, favorite and get notified
            </b>{" "}
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
            <div className="flex flex-col justify-center gap-4 h-[325px] max-w-[500px] text-center shadow-neumorphic-inner rounded-[2rem] p-4">
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
            <div className="flex flex-col justify-center gap-4 h-[325px] max-w-[500px] text-center shadow-neumorphic-inner rounded-[2rem] p-4">
              <h1 className="text-2xl uppercase inline-flex justify-center items-center gap-2">
                Preferences{" "}
                <RiHeartAddFill size={28} className="text-neumorph-accent" />
              </h1>
              <div className=" rounded-2xl bg-opacity-20 flex flex-col items-center gap-2">
                <span className="whitespace-wrap">
                  <p>
                    - The button can be used to
                    <b> add anime to your favorite list.</b>
                  </p>
                  <p>
                    {" "}
                    - The button will then turn{" "}
                    <span className="text-red-700">red</span> indicating current
                    anime is favorite.
                  </p>
                </span>
              </div>
            </div>
            <div className="example-img h-[325px]"></div>
          </div>
          <div className="favorite-anime-example-row">
            <div className="example-img h-[325px]"></div>
            <div className="flex flex-col justify-center gap-4 h-[325px] max-w-[500px] text-center shadow-neumorphic-inner rounded-[2rem] p-4">
              <h1 className="text-2xl uppercase inline-flex justify-center items-center gap-2">
                Notifications{" "}
                <RiNotification3Fill
                  size={28}
                  className="text-neumorph-accent"
                />
              </h1>
              <div className="rounded-2xl bg-opacity-20 flex flex-col items-center gap-2">
                <span className="whitespace-wrap">
                  <p>
                    - The button can be used to
                    <b> get notified when anime is out.</b>
                  </p>
                  <p>
                    - The button will then become
                    <span className="text-neumorph-accent"> accent color </span>
                    indicating current anime is favorite.
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <HomeGrid animes={data} title="Recently added"/> */}
        {/* <JikaiList animeArray={data}>
          <PaginationComponent pageCount={7} currentPage={currentPage} />
        </JikaiList> */}
      </main>
    </>
  );
}

export default WelcomePage;
