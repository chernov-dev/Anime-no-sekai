import Link from "next/link";
import { GoSync } from "react-icons/go";
import { HiChevronDoubleDown } from "react-icons/hi";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { RiHeartAddFill, RiNotification3Fill } from "react-icons/ri";
import AnsSvgLogo from "../../public/AnsSvgLogo";

const WelcomePageScreen = () => {
  return (
    <>
      <div className="section-welcome">
        <div className="h-full w-full flex flex-col items-center mt-5 px-2 gap-5">
          <h1 className="text-5xl p-2 uppercase font-bold text-primary">
            Anime no Sekai
          </h1>
          <div className="welcome-logo">
            <AnsSvgLogo
              className={"text-black"}
              fill={"var(--neumorph-accent)"}
              stroke="red"
            />
          </div>
          <div className="text-lg max-w-2xl text-center my-4 flex flex-col">
            <span className="">
              <b className="text-neumorph-accent text-opacity-70 text-xl">ANS</b>
              {" "} will let you{" "}
              <span className="text-neumorph-accent text-opacity-70">watch, track, search </span>your<b> favorite </b>
              anime.
            </span>
            <span className="">
              As well as{" "}
              <span className="text-neumorph-accent text-opacity-70">
                synchronize {" "}
              </span>
              everything
              {" "}
              <b>
                between your devices
              </b>
              .
            </span>
          </div>
          <Link passHref href={"/home"}>
            <button className="neumorphic-btn secondary p-2 text-lg gap-1 font-semibold h-12">
              <span>Go to Home</span> <IoArrowForwardCircleSharp size={32} />
            </button>
          </Link>
          <Link href={"#app-examples-section"} scroll={false} className="py-6"><HiChevronDoubleDown size={33} /></Link>
        </div>
      </div>
      <section id="app-examples-section" className="mt-14">
        <div className="favorite-anime-example-row">
          <div className="example-img h-[325px]"></div>
          <div className="flex flex-col justify-center gap-4 h-[325px] max-w-[500px] text-center shadow-neumorphic bg-neumorph-primary rounded-lg p-4">
            <h1 className="text-2xl uppercase inline-flex justify-center items-center gap-2">
              Syncing <GoSync size={28} className="text-neumorph-accent text-opacity-70" />
            </h1>
            <div className="rounded-2xl bg-opacity-20 inline-flex items-center gap-2">
              <p className="">
                Log in to your Google account to{" "}
                <b>sync your favorite anime and episodes you have watched</b>{" "}
                between your <b className="text-neumorph-accent text-opacity-70">devices</b>
              </p>
            </div>
          </div>
        </div>
        <div className="favorite-anime-example-row">
          <div className="flex flex-col justify-center gap-4 h-[325px] max-w-[500px] text-center shadow-neumorphic bg-neumorph-primary rounded-lg p-4">
            <h1 className="text-2xl uppercase inline-flex justify-center items-center gap-2">
              Preferences{" "}
              <RiHeartAddFill size={28} className="text-neumorph-accent text-opacity-70" />
            </h1>
            <div className=" rounded-2xl bg-opacity-20 flex flex-col items-center gap-2">
              <span className="whitespace-wrap">
                <p>
                  Add{" "}
                  <b>
                    anime to your{" "}
                    <span className="text-neumorph-accent text-opacity-70">favorite list</span>
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
          <div className="flex flex-col justify-center gap-4 h-[325px] max-w-[500px] text-center shadow-neumorphic bg-neumorph-primary rounded-lg p-4">
            <h1 className="text-2xl uppercase inline-flex justify-center items-center gap-2">
              Notifications{" "}
              <RiNotification3Fill size={28} className="text-neumorph-accent text-opacity-70" />
            </h1>
            <div className="rounded-2xl bg-opacity-20 flex flex-col items-center gap-2">
              <span className="whitespace-wrap">
                <p>
                  Subscribe{" "}
                  <b>
                    and get{" "}
                    <span className="text-neumorph-accent text-opacity-70">
                      notified weekly{" "}
                    </span>
                  </b>
                  when anime is supposed to come out
                </p>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WelcomePageScreen;
