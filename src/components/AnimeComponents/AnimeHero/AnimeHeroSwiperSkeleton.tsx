import Skeleton from "react-loading-skeleton";

const AnimeHeroSwiperSkeleton = () => {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-5 rounded-2xl p-4 w-full">
        <div className="w-full h-auto sm:h-[22rem] lg:h-[30rem] lg:w-[40%] shadow-neumorphic ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10 px-6 py-4 rounded-[inherit] flex flex-col gap-4 justify-center text-neumorph-secondary">
          <div className="text-center">
            <h1 className="anime-title text-xl lg:text-3xl truncate">
              <Skeleton height={20} width={`80%`} />
            </h1>
            <div className="anime-subtitle text-base lg:text-xl">
              <Skeleton height={20} width={`70%`} />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="neumorphic-chip w-24" style={{ padding: 0 }}>
              <p className="w-full h-full" style={{ lineHeight: "1rem" }} >
                <Skeleton height={'100%'} width={"100%"} borderRadius=".75rem" style={{ lineHeight: "1rem" }} />
              </p>
            </div>
            <div className="neumorphic-chip w-24" style={{ padding: 0 }}>
              <p className="w-full h-full" style={{ lineHeight: "1rem" }} >
                <Skeleton height={'100%'} width={"100%"} borderRadius=".75rem" style={{ lineHeight: "1rem" }} />
              </p>
            </div>
            <div className="neumorphic-chip w-24" style={{ padding: 0 }}>
              <p className="w-full h-full" style={{ lineHeight: "1rem" }} >
                <Skeleton height={'100%'} width={"100%"} borderRadius=".75rem" style={{ lineHeight: "1rem" }} />
              </p>
            </div>
          </div>
          {/* <AnimeHeroExtraInfo anime={anime} /> */}
          <div className="grow flex items-center">
            <p className="anime-desc w-full">
              <Skeleton count={3} />
            </p>
          </div>
          <button className="neumorphic-btn secondary flex gap-2" style={{ padding: 0 }}>
            <p className="w-full h-full" style={{ lineHeight: "1rem" }} >
              <Skeleton height={"100%"} width={"100%"} borderRadius=".75rem" style={{ lineHeight: "1rem" }} />
            </p>
          </button>
        </div>
        <div className="h-[15rem] sm:h-[22rem] lg:h-[30rem] w-full grow rounded-2xl relative neumorphic-border border-4 border-dotted">
          <div className="rounded-[inherit] h-full p-2 text-xs">
            <Skeleton height={"100%"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeHeroSwiperSkeleton;
