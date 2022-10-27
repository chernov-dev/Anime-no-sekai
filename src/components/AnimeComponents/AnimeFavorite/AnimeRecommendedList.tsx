import Image from "next/image";

const AnimeRecommendedList = ({ anime }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="anime-home__header mt-4 px-1 flex justify-between">
        <p className="text-base md:text-xl">Recommended based on your anime</p>
      </div>
      <div className="neumorphic-list">
        {anime.map((anime, index) => {
          return (
            <div
              key={anime.title.english}
              onClick={() => {
                location.href = `/anime/${anime.id}`;
              }}
              className="cursor-pointer"
            >
              <Image
                src={anime.image}
                style={{ flexGrow: 1 }}
                width={60}
                height={78}
                alt="top anime"
                layout="fixed"
              />
              <p className="text-neumorph-secondary opacity-90 short mx-2.5 grow">
                {anime.title.english ?? anime.title.userPreferred}
              </p>
              <p className="anime-type mr-2">{anime.type}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimeRecommendedList;
